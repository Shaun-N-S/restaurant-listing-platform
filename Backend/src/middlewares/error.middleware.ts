import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../constants/messages";
import multer from "multer";
import { StatusCode } from "../utils/statusCode.enum";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      message: err.issues[0]?.message ?? MESSAGES.COMMON.VALIDATION_ERROR,
    });
  }

  if (err instanceof multer.MulterError) {
    return res.status(StatusCode.PAYLOAD_TOO_LARGE).json({
      success: false,
      message: MESSAGES.IMAGE.FILE_TOO_LARGE,
    });
  }

  if (err.message === MESSAGES.IMAGE.INVALID_TYPE) {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === MESSAGES.COMMON.INVALID_ID) {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }

  if (
    err.message === MESSAGES.PAGINATION.INVALID_PAGE ||
    err.message === MESSAGES.PAGINATION.INVALID_LIMIT
  ) {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === MESSAGES.CLOUDINARY.UPLOAD_FAILED) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
  });
};
