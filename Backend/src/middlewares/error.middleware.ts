import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import multer from "multer";

import { StatusCode } from "../utils/statusCode.enum";
import { ResponseHelper } from "../utils/response.helper";
import { MESSAGES } from "../constants/messages";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return ResponseHelper.error(
      res,
      err.issues[0]?.message ?? MESSAGES.COMMON.VALIDATION_ERROR,
      StatusCode.BAD_REQUEST,
    );
  }

  if (err instanceof multer.MulterError) {
    return ResponseHelper.error(
      res,
      MESSAGES.IMAGE.FILE_TOO_LARGE,
      StatusCode.PAYLOAD_TOO_LARGE,
    );
  }

  if (err.message === MESSAGES.IMAGE.INVALID_TYPE) {
    return ResponseHelper.error(res, err.message, StatusCode.BAD_REQUEST);
  }

  if (err.message === MESSAGES.COMMON.INVALID_ID) {
    return ResponseHelper.error(res, err.message, StatusCode.BAD_REQUEST);
  }

  if (
    err.message === MESSAGES.PAGINATION.INVALID_PAGE ||
    err.message === MESSAGES.PAGINATION.INVALID_LIMIT
  ) {
    return ResponseHelper.error(res, err.message, StatusCode.BAD_REQUEST);
  }

  if (err.message === MESSAGES.CLOUDINARY.UPLOAD_FAILED) {
    return ResponseHelper.error(
      res,
      err.message,
      StatusCode.INTERNAL_SERVER_ERROR,
    );
  }

  return ResponseHelper.error(
    res,
    MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    StatusCode.INTERNAL_SERVER_ERROR,
  );
};
