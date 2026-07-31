import { NextFunction, Request, Response } from "express";
import { IRestaurantService } from "../services/interfaces/IRestaurant.services";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { StatusCode } from "../utils/statusCode.enum";
import { MESSAGES } from "../constants/messages";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../validators/restaurant.validator";
import { ResponseHelper } from "../utils/response.helper";
import {
  BadRequestException,
  NotFoundException,
} from "../exceptions/custom.exceptions";

export class RestaurantController {
  private validateId(id: string): number {
    const restaurantId = Number(id);

    if (isNaN(restaurantId) || restaurantId <= 0) {
      throw new BadRequestException(MESSAGES.COMMON.INVALID_ID);
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

      return ResponseHelper.success(
        res,
        MESSAGES.RESTAURANT.CREATED,
        data,
        StatusCode.CREATED,
      );
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
        throw new BadRequestException(MESSAGES.PAGINATION.INVALID_PAGE);
      }

      if (isNaN(limitNumber) || limitNumber < 1) {
        throw new BadRequestException(MESSAGES.PAGINATION.INVALID_LIMIT);
      }

      const result = await this.service.getAll(
        q as string,
        pageNumber,
        limitNumber,
      );

      return ResponseHelper.success(
        res,
        MESSAGES.RESTAURANT.FETCH_SUCCESS,
        result.data,
        StatusCode.OK,
        {
          total: result.total,
          page: pageNumber,
          limit: limitNumber,
        },
      );
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
        throw new NotFoundException(MESSAGES.RESTAURANT.NOT_FOUND);
      }

      return ResponseHelper.success(
        res,
        MESSAGES.RESTAURANT.UPDATED,
        updated,
        StatusCode.OK,
      );
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurantId = this.validateId(req.params.id as string);

      const deleted = await this.service.remove(restaurantId);

      if (!deleted) {
        throw new NotFoundException(MESSAGES.RESTAURANT.NOT_FOUND);
      }

      return ResponseHelper.success(
        res,
        MESSAGES.RESTAURANT.DELETED,
        null,
        StatusCode.OK,
      );
    } catch (err) {
      next(err);
    }
  }
}
