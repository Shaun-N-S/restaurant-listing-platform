import { Restaurant } from "../models";
import { BaseRepository } from "./base.repository";
import { IRestaurantRepository } from "./interfaces/IRestaurant.repository";
import { IPaginatedRestaurants, IRestaurant } from "../types/restaurant.types";
import { Op } from "sequelize";

export class RestaurantRepository
  extends BaseRepository<IRestaurant>
  implements IRestaurantRepository
{
  constructor() {
    super(Restaurant);
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

  async update(id: number, data: Partial<IRestaurant>) {
    await Restaurant.update(data, { where: { id } });

    const updatedRestaurant = await Restaurant.findByPk(id);

    return updatedRestaurant;
  }

  // create, findById, and delete are inherited from BaseRepository —
  // identical behavior to the previous implementation.
}
