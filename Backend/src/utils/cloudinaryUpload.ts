import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";
import { MESSAGES } from "../constants/messages";
import { InternalServerException } from "../exceptions/custom.exceptions";

export const uploadToCloudinary = (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "restaurants" },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) {
          return reject(
            new InternalServerException(MESSAGES.CLOUDINARY.UPLOAD_FAILED),
          );
        }

        resolve(result.secure_url);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
