import axios from "axios";

export const getApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Something went wrong";
  }

  return "Something went wrong";
};
