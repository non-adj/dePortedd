import json
from collections import defaultdict
from typing import Any

import boto3
import os
import time
import numpy as np
import requests
from sklearn.cluster import DBSCAN
from typing import Tuple
import re
from concurrent.futures import ThreadPoolExecutor

def terraform_rate_expression_to_minutes(rate_expression: str) -> Tuple[int, int]:
    match = re.match(r"rate\((\d+)\s*(day|hour|minute)s?\)", rate_expression)
    if not match:
        raise ValueError(f"Invalid rate expression: {rate_expression}")

    value, unit = int(match.group(1)), match.group(2)

    if unit == "day":
        return value * 24 * 60
    elif unit == "hour":
        return value * 60
    elif unit == "minute":
        return value
    else:
        raise ValueError(f"Unsupported time unit: {unit}")
    
UPDATE_RATE_MINS = terraform_rate_expression_to_minutes(os.getenv("UPDATE_RATE_MINS", "60"))
GRACE_PERIOD_MINS = int(2) # XXX: set expiration a few minutes after in case put object takes a while
TILE_SIZE_DEGREES = int(5)

def get_all_nodes():
    # Set up the Overpass API query
    query = """
    [out:json];
    node["man_made"="surveillance"]["surveillance:type"="ALPR"];
    out body;
    """

    url = "http://overpass-api.de/api/interpreter"
    response = requests.get(
        url, params={"data": query}, headers={"User-Agent": "DeFlock/1.0"}
    )
    response.raise_for_status()
    return response.json()["elements"]


def get_clusters(nodes: list[Any]):
    # Request data from Overpass API
    print("Requesting data from Overpass API.")

    print("Data received. Parsing nodes...")

    # Parse nodes and extract lat/lon for clustering
    coordinates = []
    node_ids = []
    for element in nodes:
        if element["type"] == "node":
            coordinates.append([element["lat"], element["lon"]])
            node_ids.append(element["id"])

    # Convert coordinates to NumPy array for DBSCAN
    coordinates = np.array(coordinates)

    # Define the clustering radius (50 miles in meters)
    radius_miles = 50
    radius_km = radius_miles * 1.60934  # 1 mile = 1.60934 km
    radius_in_radians = radius_km / 6371.0  # Earth's radius in km

    # Perform DBSCAN clustering
    db = DBSCAN(
        eps=radius_in_radians, min_samples=1, algorithm="ball_tree", metric="haversine"
    ).fit(np.radians(coordinates))
    labels = db.labels_

    # Prepare clusters and calculate centroids
    clusters = {}
    for label in set(labels):
        cluster_points = coordinates[labels == label]
        centroid = np.mean(cluster_points, axis=0)
        first_node_id = node_ids[labels.tolist().index(label)]

        # Store in clusters dict with centroid and first node ID
        clusters[label] = {"lat": centroid[0], "lon": centroid[1], "id": first_node_id}

    output = {"clusters": list(clusters.values())}
    print("Clustering complete.")
    return output


def segment_regions(nodes: Any, tile_size_degrees: int) -> dict[Any]:
    print("Segmenting regions...")
    tile_dict = defaultdict(list)
    for node in nodes:
        lat, lon = node["lat"], node["lon"]
        tile_lat = int(np.floor(lat / tile_size_degrees)) * tile_size_degrees
        tile_lon = int(np.floor(lon / tile_size_degrees)) * tile_size_degrees
        tile_dict[f"{tile_lat}/{tile_lon}"].append(node)
    print("Region segmentation complete.")

    return tile_dict

def lambda_handler(event, context):
    nodes = get_all_nodes()
    alpr_clusters = get_clusters(nodes)
    regions_dict = segment_regions(nodes=nodes, tile_size_degrees=TILE_SIZE_DEGREES)

    print("Uploading data to S3...")

    s3 = boto3.client("s3")
    bucket = "deflock-clusters"
    bucket_new = "cdn.deflock.me"
    key = "alpr_clusters.json"

    s3.put_object(
        Bucket=bucket,
        Key=key,
        Body=json.dumps(alpr_clusters),
        ContentType="application/json",
    )

    # TODO: handle outdated index files when their referenced files are deleted
    epoch = int(time.time())
    tile_index = {
        "expiration_utc": epoch + (UPDATE_RATE_MINS + GRACE_PERIOD_MINS) * 60,
        "regions": list(regions_dict.keys()),
        "tile_url": "https://cdn.deflock.me/regions/{lat}/{lon}.json?v=" + str(epoch),
        "tile_size_degrees": TILE_SIZE_DEGREES,
    }

    print("Uploading regions to S3...")

    def upload_json_to_s3(bucket, key, body):
        s3.put_object(
            Bucket=bucket,
            Key=key,
            Body=body,
            ContentType="application/json",
        )

    # Use ThreadPoolExecutor for concurrent uploads
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = []
        for latlng_string, elements in regions_dict.items():
            lat, lon = latlng_string.split("/")
            key = f"regions/{lat}/{lon}.json"
            body = json.dumps(elements)
            futures.append(executor.submit(upload_json_to_s3, bucket_new, key, body))
        
        # add index file
        futures.append(executor.submit(upload_json_to_s3, bucket_new, "regions/index.json", json.dumps(tile_index)))

        # Wait for all futures to complete
        for future in futures:
            future.result()

    print("Regions uploaded to S3. Done!")

    return {
        "statusCode": 200,
        "body": "Successfully clustered.",
    }


if __name__ == "__main__":
    from pathlib import Path

    nodes_file_path = Path("nodes.json")
    if nodes_file_path.exists():
        nodes = json.load(nodes_file_path.open())
    else:
        nodes = get_all_nodes()
        with nodes_file_path.open("w") as f:
            json.dump(nodes, f)



    regions_dict = segment_regions(nodes=nodes, tile_size_degrees=5)
    with open("regions_dict.json", "w") as f:
        json.dump(regions_dict, f)
