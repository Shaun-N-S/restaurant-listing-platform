const db = require("../../models");
const { Restaurant } = db;
import { IRestaurantRepository } from "./interfaces/IRestaurant.repository";
import { IPaginatedRestaurants, IRestaurant } from "../types/restaurant.types";
import { Op } from "sequelize";

export class RestaurantRepository implements IRestaurantRepository {
  async create(data: IRestaurant) {
    return await Restaurant.create(data);
  }

  async findAll(
    query?: string,
    page: number = 1,
    limit: number = 6
  ): Promise<IPaginatedRestaurants> {
    const offset = (page - 1) * limit;

    const where = query
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { address: { [Op.iLike]: `%${query}%` } },
          ],
        }
      : {};

    const { rows, count } = await Restaurant.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      data: rows,
      total: count,
    };
  }

  async update(id: number, data: Partial<IRestaurant>) {
    const [updated] = await Restaurant.update(data, { where: { id } });
    return updated;
  }

  async delete(id: number) {
    return await Restaurant.destroy({ where: { id } });
  }
  
}
