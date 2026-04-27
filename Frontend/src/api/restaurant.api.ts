import axios from "axios";

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

export const updateRestaurant = (id: number, data: FormData) =>
  API.put(`/restaurants/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteRestaurant = (id: number) =>
  API.delete(`/restaurants/${id}`);
