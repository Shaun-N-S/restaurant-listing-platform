import { IRestaurant } from "../../types/restaurant.types";

export interface IRestaurantService {
  create(data: IRestaurant): Promise<IRestaurant>;
  getAll(): Promise<IRestaurant[]>;
  update(id: number, data: Partial<IRestaurant>): Promise<number>;
  remove(id: number): Promise<number>;
}
