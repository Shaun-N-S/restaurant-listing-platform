import { Request, Response } from "express";
import { IRestaurantService } from "../services/interfaces/IRestaurant.services";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { StatusCode } from "../utils/statusCode.enum";
import { MESSAGES } from "../constants/messages";

export class RestaurantController {
  constructor(private service: IRestaurantService) {}

  async create(req: Request, res: Response) {
    try {
      let imageUrl = "";

      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const data = await this.service.create({
        ...req.body,
        imageUrl,
      });

      res.status(StatusCode.CREATED).json({
        success: true,
        message: MESSAGES.RESTAURANT.CREATED,
        data,
      });
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err instanceof Error ? err.message : MESSAGES.RESTAURANT.ERROR,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { q, page = "1", limit = "6" } = req.query;

      const result = await this.service.getAll(
        q as string,
        Number(page),
        Number(limit),
      );

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.RESTAURANT.FETCH_SUCCESS,
        data: result.data,
        total: result.total,
      });
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err instanceof Error ? err.message : MESSAGES.RESTAURANT.ERROR,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let imageUrl: string | undefined;

      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const updated = await this.service.update(Number(id), {
        ...req.body,
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
      });
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err instanceof Error ? err.message : MESSAGES.RESTAURANT.ERROR,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await this.service.remove(Number(id));

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
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err instanceof Error ? err.message : MESSAGES.RESTAURANT.ERROR,
      });
    }
  }
}
