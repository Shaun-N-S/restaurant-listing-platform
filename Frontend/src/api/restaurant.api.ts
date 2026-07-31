import type { Restaurant } from "../types/restaurant.types";
import type { ApiResponse, PaginatedApiResponse } from "../types/api.types";
import { API_ROUTES } from "../constants/apiRoutes";
import { apiClient } from "./axios";

export const getRestaurants = async (
  query = "",
  page = 1,
  limit = 6,
): Promise<PaginatedApiResponse<Restaurant>> => {
  const res = await apiClient.get<PaginatedApiResponse<Restaurant>>(
    API_ROUTES.RESTAURANTS.BASE,
    {
      params: {
        q: query,
        page,
        limit,
      },
    },
  );

  return res.data;
};

export const createRestaurant = async (
  data: FormData,
): Promise<ApiResponse<Restaurant>> => {
  const res = await apiClient.post<ApiResponse<Restaurant>>(
    API_ROUTES.RESTAURANTS.BASE,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};

export const updateRestaurant = async (
  id: number,
  data: FormData,
): Promise<ApiResponse<Restaurant>> => {
  const res = await apiClient.put<ApiResponse<Restaurant>>(
    API_ROUTES.RESTAURANTS.BY_ID(id),
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};

export const deleteRestaurant = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const res = await apiClient.delete<ApiResponse<null>>(
    API_ROUTES.RESTAURANTS.BY_ID(id),
  );

  return res.data;
};
