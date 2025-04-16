# Student Visa Revocation Tracker

A crowdsourced tool for locating, reporting, and visualizing student visa revocations and deportations in the United States.

## Purpose

This project was created to shed light on the scope and impact of student visa revocations and deportations across the US. By mapping and aggregating these events, we aim to provide transparency, support advocacy, and inform affected communities and institutions.

## What it Does

### View Visa Revocations on a Map
Displays locations and counts of student visa revocations and deportations, with breakdowns by state and educational institution.

### Report and Track Cases
Allows users to contribute data on new revocation events and see trends over time.

### Learn About the Issue
Provides resources and information about student visa policies, rights, and the impact of revocations. A breakdown of data brokers will also be added in the future.

## Tech Stack

### Backend
* Scala
* PekkoHTTP
* Nginx

### Cloud
* AWS Lambda (for clustering and counts)
* AWS S3
* AWS ECR

### Frontend
* Vue3
* Vuetify (UI component library)
* Vue Leaflet (mapping library)

### Services
* OpenStreetMap - Overpass API (for geocoding)
* Nominatim - Geocoding
* Stadia Maps - Map Tiles

## Usage

### Requirements
* node/npm
* scala/sbt

### Running Frontend

1. `cd webapp`
2. `npm i`
3. `npm run dev`

### Running Backend

1. `cd shotgun`
2. `sbt run`

## Contributing

We welcome contributions from anyone interested in supporting transparency and advocacy for international students. To contribute:

1. Fork the Repository
2. Make Your Changes
3. Open a Pull Request against This Repo
