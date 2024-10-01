import axios from "axios";

export interface BoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

const apiService = axios.create({
  baseURL: "http://localhost:8080",
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
