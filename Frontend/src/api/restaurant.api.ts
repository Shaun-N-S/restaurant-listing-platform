import axios from "axios";
import type { RestaurantInput } from "../types/restaurant.types";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getRestaurants = () => API.get("/restaurants");

export const createRestaurant = (data: FormData) =>
  API.post("/restaurants", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateRestaurant = (id: number, data: Partial<RestaurantInput>) =>
  API.put(`/restaurants/${id}`, data);

export const deleteRestaurant = (id: number) =>
  API.delete(`/restaurants/${id}`);
