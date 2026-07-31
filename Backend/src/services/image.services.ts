import { IImageService } from "./interfaces/IImage.services";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

export class ImageService implements IImageService {
  async upload(file: Express.Multer.File): Promise<string> {
    return uploadToCloudinary(file);
  }
}
