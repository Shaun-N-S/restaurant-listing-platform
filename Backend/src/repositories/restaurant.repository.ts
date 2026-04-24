const db = require("../../models");
const { Restaurant } = db;

import { IRestaurantRepository } from "./interfaces/IRestaurant.repository";
import { IRestaurant } from "../types/restaurant.types";

export class RestaurantRepository implements IRestaurantRepository {
  async create(data: IRestaurant) {
    return await Restaurant.create(data);
  }

  async findAll() {
    return await Restaurant.findAll();
  }

  async update(id: number, data: Partial<IRestaurant>) {
    const [updated] = await Restaurant.update(data, { where: { id } });
    return updated;
  }

  async delete(id: number) {
    return await Restaurant.destroy({ where: { id } });
  }
}
