import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../api/restaurant.api";
import type { PaginatedRestaurantsResponse } from "../api/restaurant.api";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useRestaurants = (search: string, page: number, limit: number) => {
  return useQuery<PaginatedRestaurantsResponse>({
    queryKey: QUERY_KEYS.RESTAURANTS(search, page, limit),
    queryFn: () => getRestaurants(search, page, limit),

    placeholderData: (previousData) => previousData,
  });
};
