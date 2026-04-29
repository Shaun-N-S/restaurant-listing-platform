import { IPaginatedRestaurants, IRestaurant } from "../../types/restaurant.types";

export interface IRestaurantRepository {
  create(data: IRestaurant): Promise<IRestaurant>;
    findAll(
    query?: string,
    page?: number,
    limit?: number
  ): Promise<IPaginatedRestaurants>;
  update(id: number, data: Partial<IRestaurant>): Promise<number>;
  delete(id: number): Promise<number>;
}
