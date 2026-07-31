import multer from "multer";

import {
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from "../constants/upload.constants";
import { MESSAGES } from "../constants/messages";
import { BadRequestException } from "../exceptions/custom.exceptions";

const storage = multer.memoryStorage();

export const uploadConfig = multer({
  storage,

  limits: {
    fileSize: MAX_FILE_SIZE,
  },

  fileFilter(req, file, cb) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      return cb(new BadRequestException(MESSAGES.IMAGE.INVALID_TYPE));
    }

    cb(null, true);
  },
});
