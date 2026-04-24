import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export const uploadToCloudinary = (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "restaurants" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
