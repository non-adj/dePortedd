import axios from "axios";

export interface BoundingBoxLiteral {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export class BoundingBox implements BoundingBoxLiteral {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;

  constructor({minLat, maxLat, minLng, maxLng}: BoundingBoxLiteral) {
    this.minLat = minLat;
    this.maxLat = maxLat;
    this.minLng = minLng;
    this.maxLng = maxLng;
  }

  updateFromOther(boundingBoxLiteral: BoundingBoxLiteral) {
    this.minLat = boundingBoxLiteral.minLat;
    this.maxLat = boundingBoxLiteral.maxLat;
    this.minLng = boundingBoxLiteral.minLng;
    this.maxLng = boundingBoxLiteral.maxLng;
  }

  isSubsetOf(other: BoundingBoxLiteral) {
    return (
      this.minLat >= other.minLat &&
      this.maxLat <= other.maxLat &&
      this.minLng >= other.minLng &&
      this.maxLng <= other.maxLng
    );
  }
}

const apiService = axios.create({
  baseURL: window.location.hostname === "localhost" ? "http://localhost:8080/api" : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getALPRs = async (boundingBox: BoundingBox) => {
  const queryParams = new URLSearchParams({
    minLat: boundingBox.minLat.toString(),
    maxLat: boundingBox.maxLat.toString(),
    minLng: boundingBox.minLng.toString(),
    maxLng: boundingBox.maxLng.toString(),
  });
  const response = await apiService.get(`/alpr?${queryParams.toString()}`);
  return response.data;
}
