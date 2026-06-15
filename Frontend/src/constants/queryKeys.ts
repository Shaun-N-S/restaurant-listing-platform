export const QUERY_KEYS = {
  RESTAURANTS: (search: string, page: number, limit: number) =>
    ["restaurants", search, page, limit] as const,
};
