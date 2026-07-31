export interface IImageService {
  upload(file: Express.Multer.File): Promise<string>;
}
