import { IRestaurantService } from "./interfaces/IRestaurant.services";
import { IRestaurantRepository } from "../repositories/interfaces/IRestaurant.repository";
import { IPaginatedRestaurants, IRestaurant } from "../types/restaurant.types";
import { NotFoundException } from "../exceptions/custom.exceptions";
import { MESSAGES } from "../constants/messages";

export class RestaurantService implements IRestaurantService {
  constructor(private repo: IRestaurantRepository) {}

  async create(data: IRestaurant) {
    return this.repo.create(data);
  }

  async getAll(
    query?: string,
    page: number = 1,
    limit: number = 6,
  ): Promise<IPaginatedRestaurants> {
    return this.repo.findAll(query, page, limit);
  }

  async update(id: number, data: Partial<IRestaurant>): Promise<IRestaurant> {
    const restaurant = await this.repo.findById(id);

    if (!restaurant) {
      throw new NotFoundException(MESSAGES.RESTAURANT.NOT_FOUND);
    }

    const updatedRestaurant = await this.repo.update(id, data);

    if (!updatedRestaurant) {
      throw new NotFoundException(MESSAGES.RESTAURANT.NOT_FOUND);
    }

    return updatedRestaurant;
  }

  async remove(id: number) {
    const restaurant = await this.repo.findById(id);

    if (!restaurant) {
      throw new NotFoundException(MESSAGES.RESTAURANT.NOT_FOUND);
    }

    await this.repo.delete(id);

    return true;
  }
}
