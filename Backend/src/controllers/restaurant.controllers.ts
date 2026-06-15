import { NextFunction, Request, Response } from "express";
import { IRestaurantService } from "../services/interfaces/IRestaurant.services";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { StatusCode } from "../utils/statusCode.enum";
import { MESSAGES } from "../constants/messages";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../validators/restaurant.validator";

export class RestaurantController {
  private validateId(id: string): number {
    const restaurantId = Number(id);

    if (isNaN(restaurantId) || restaurantId <= 0) {
      throw new Error(MESSAGES.COMMON.INVALID_ID);
    }

    return restaurantId;
  }

  constructor(private service: IRestaurantService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let imageUrl = "";

      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const validatedData = createRestaurantSchema.parse(req.body);

      const data = await this.service.create({
        ...validatedData,
        imageUrl,
      });

      res.status(StatusCode.CREATED).json({
        success: true,
        message: MESSAGES.RESTAURANT.CREATED,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, page = "1", limit = "6" } = req.query;

      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      if (isNaN(pageNumber) || pageNumber < 1) {
        throw new Error(MESSAGES.PAGINATION.INVALID_PAGE);
      }

      if (isNaN(limitNumber) || limitNumber < 1) {
        throw new Error(MESSAGES.PAGINATION.INVALID_LIMIT);
      }

      const result = await this.service.getAll(
        q as string,
        pageNumber,
        limitNumber,
      );

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.RESTAURANT.FETCH_SUCCESS,
        data: result.data,
        total: result.total,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurantId = this.validateId(req.params.id as string);

      let imageUrl: string | undefined;

      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const validatedData = updateRestaurantSchema.parse(req.body);

      const updated = await this.service.update(restaurantId, {
        ...validatedData,
        ...(imageUrl && { imageUrl }),
      });

      if (!updated) {
        return res.status(StatusCode.NOT_FOUND).json({
          success: false,
          message: MESSAGES.RESTAURANT.NOT_FOUND,
        });
      }

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.RESTAURANT.UPDATED,
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurantId = this.validateId(req.params.id as string);

      const deleted = await this.service.remove(restaurantId);

      if (!deleted) {
        return res.status(StatusCode.NOT_FOUND).json({
          success: false,
          message: MESSAGES.RESTAURANT.NOT_FOUND,
        });
      }

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.RESTAURANT.DELETED,
      });
    } catch (err) {
      next(err);
    }
  }
}
