import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
