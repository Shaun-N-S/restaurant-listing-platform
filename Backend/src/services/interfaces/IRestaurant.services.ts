import {
  IPaginatedRestaurants,
  IRestaurant,
} from "../../types/restaurant.types";

export interface IRestaurantService {
  create(data: IRestaurant): Promise<IRestaurant>;
  getAll(
    query?: string,
    page?: number,
    limit?: number,
  ): Promise<IPaginatedRestaurants>;
  update(id: number, data: Partial<IRestaurant>): Promise<IRestaurant>;
  remove(id: number): Promise<boolean>;
}
