import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../api/restaurant.api";
import type { PaginatedApiResponse } from "../types/api.types";
import type { Restaurant } from "../types/restaurant.types";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useRestaurants = (search: string, page: number, limit: number) => {
  return useQuery<PaginatedApiResponse<Restaurant>>({
    queryKey: QUERY_KEYS.RESTAURANTS(search, page, limit),
    queryFn: () => getRestaurants(search, page, limit),

    placeholderData: (previousData) => previousData,
  });
};
