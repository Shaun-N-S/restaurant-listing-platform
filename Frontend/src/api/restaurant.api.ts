import axios from "axios";
import type { Restaurant } from "../types/restaurant.types";
import { API_ROUTES } from "../constants/apiRoutes";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface PaginatedRestaurantsResponse {
  data: Restaurant[];
  total: number;
}

export interface CreateRestaurantResponse {
  success: boolean;
  data: Restaurant;
}

export const getRestaurants = async (
  query?: string,
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedRestaurantsResponse> => {
  const res = await API.get(API_ROUTES.RESTAURANTS.BASE, {
    params: {
      q: query || "",
      page,
      limit,
    },
  });

  return res.data;
};

export const createRestaurant = async (
  data: FormData,
): Promise<CreateRestaurantResponse> => {
  const res = await API.post(API_ROUTES.RESTAURANTS.BASE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateRestaurant = async (
  id: number,
  data: FormData,
): Promise<CreateRestaurantResponse> => {
  const res = await API.put(API_ROUTES.RESTAURANTS.BY_ID(id), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteRestaurant = async (id: number): Promise<CreateRestaurantResponse> => {
  const res = await API.delete(API_ROUTES.RESTAURANTS.BY_ID(id));
  return res.data;
};
