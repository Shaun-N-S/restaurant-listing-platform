import {
  IPaginatedRestaurants,
  IRestaurant,
} from "../../types/restaurant.types";

export interface IRestaurantRepository {
  create(data: IRestaurant): Promise<IRestaurant>;
  findAll(
    query?: string,
    page?: number,
    limit?: number,
  ): Promise<IPaginatedRestaurants>;
  findById(id: number): Promise<IRestaurant | null>;
  update(id: number, data: Partial<IRestaurant>): Promise<IRestaurant | null>;
  delete(id: number): Promise<boolean>;
}
