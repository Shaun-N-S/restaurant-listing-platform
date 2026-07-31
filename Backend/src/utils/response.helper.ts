import { Response } from "express";
import { StatusCode } from "./statusCode.enum";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T | null;
  meta?: Record<string, unknown>;
}

export class ResponseHelper {
  static success<T>(
    res: Response,
    message: string,
    data?: T | null,
    status: StatusCode = StatusCode.OK,
    meta?: Record<string, unknown>,
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };

    if (meta !== undefined) {
      response.meta = meta;
    }

    return res.status(status).json(response);
  }

  static error(
    res: Response,
    message: string,
    status: StatusCode = StatusCode.BAD_REQUEST,
  ) {
    return res.status(status).json({
      success: false,
      message,
      data: null,
    });
  }
}
