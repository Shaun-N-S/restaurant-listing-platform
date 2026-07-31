import { StatusCode } from "../utils/statusCode.enum";

export class AppException extends Error {
  public readonly statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestException extends AppException {
  constructor(message: string) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export class NotFoundException extends AppException {
  constructor(message: string) {
    super(message, StatusCode.NOT_FOUND);
  }
}

export class ConflictException extends AppException {
  constructor(message: string) {
    super(message, StatusCode.CONFLICT);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message: string) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

export class ForbiddenException extends AppException {
  constructor(message: string) {
    super(message, StatusCode.FORBIDDEN);
  }
}

export class InternalServerException extends AppException {
  constructor(message: string) {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}
