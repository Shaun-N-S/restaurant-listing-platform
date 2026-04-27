import { IRestaurant } from "../../types/restaurant.types";

export interface IRestaurantRepository {
  create(data: IRestaurant): Promise<IRestaurant>;
  findAll(): Promise<IRestaurant[]>;
  update(id: number, data: Partial<IRestaurant>): Promise<number>;
  delete(id: number): Promise<number>;
}
