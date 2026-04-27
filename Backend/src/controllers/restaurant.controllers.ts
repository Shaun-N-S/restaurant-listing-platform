import { Request, Response } from "express";
import { IRestaurantService } from "../services/interfaces/IRestaurant.services";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { StatusCode } from "../utils/statusCode.enum";

export class RestaurantController {
  constructor(private service: IRestaurantService) {}

  async create(req: Request, res: Response) {
    try {
      let imageUrl = "";

      // upload file → cloudinary
      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const data = await this.service.create({
        ...req.body,
        imageUrl,
      });

      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Error",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    const data = await this.service.getAll();
    res.status(StatusCode.OK).json({ success: true, data });
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let imageUrl: string | undefined;

      // if new image uploaded
      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const updated = await this.service.update(Number(id), {
        ...req.body,
        ...(imageUrl && { imageUrl }),
      });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }

      res.status(StatusCode.OK).json({
        success: true,
        message: "Updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.remove(Number(id));
    res.status(StatusCode.OK).json({ success: true });
  }
}
