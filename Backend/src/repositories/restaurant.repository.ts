import { Restaurant } from "../models";
import { IRestaurantRepository } from "./interfaces/IRestaurant.repository";
import { IPaginatedRestaurants, IRestaurant } from "../types/restaurant.types";
import { Op } from "sequelize";

export class RestaurantRepository implements IRestaurantRepository {
  async create(data: IRestaurant) {
    return Restaurant.create(data);
  }

  async findAll(
    query?: string,
    page: number = 1,
    limit: number = 6,
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

  async findById(id: number): Promise<IRestaurant | null> {
    return Restaurant.findByPk(id);
  }

  async update(id: number, data: Partial<IRestaurant>) {
    await Restaurant.update(data, { where: { id } });

    const updatedRestaurant = await Restaurant.findByPk(id);

    return updatedRestaurant;
  }

  async delete(id: number) {
    const deletedCount = await Restaurant.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }
}
