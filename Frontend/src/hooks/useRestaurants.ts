import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../api/restaurant.api";
import type { PaginatedRestaurantsResponse } from "../api/restaurant.api";

export const useRestaurants = (search: string, page: number, limit: number) => {
  return useQuery<PaginatedRestaurantsResponse>({
    queryKey: ["restaurants", search, page, limit],
    queryFn: () => getRestaurants(search, page, limit),

    placeholderData: (previousData) => previousData,
  });
};
