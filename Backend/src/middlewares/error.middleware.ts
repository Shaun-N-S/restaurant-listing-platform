import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ZodError } from "zod";

import { ResponseHelper } from "../utils/response.helper";
import { StatusCode } from "../utils/statusCode.enum";
import { MESSAGES } from "../constants/messages";
import { AppException } from "../exceptions/custom.exceptions";

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

  if (err instanceof AppException) {
    return ResponseHelper.error(res, err.message, err.statusCode);
  }

  return ResponseHelper.error(
    res,
    MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    StatusCode.INTERNAL_SERVER_ERROR,
  );
};
