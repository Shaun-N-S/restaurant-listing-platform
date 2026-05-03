import { IRestaurantService } from "./interfaces/IRestaurant.services";
import { IRestaurantRepository } from "../repositories/interfaces/IRestaurant.repository";
import { IPaginatedRestaurants, IRestaurant } from "../types/restaurant.types";

export class RestaurantService implements IRestaurantService {
  constructor(private repo: IRestaurantRepository) {}

  async create(data: IRestaurant) {
    if (!data.name || !data.address || !data.contact) {
      throw new Error("Required fields missing");
    }
    return this.repo.create(data);
  }

  async getAll(
    query?: string,
    page: number = 1,
    limit: number = 6,
  ): Promise<IPaginatedRestaurants> {
    return this.repo.findAll(query, page, limit);
  }

  async update(id: number, data: Partial<IRestaurant>) {
    return this.repo.update(id, data);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
