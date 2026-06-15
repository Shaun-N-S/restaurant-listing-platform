export const MESSAGES = {
  COMMON: {
    INTERNAL_SERVER_ERROR: "Internal server error",
    INVALID_ID: "Invalid restaurant id",
    VALIDATION_ERROR: "Validation failed",
  },

  RESTAURANT: {
    CREATED: "Restaurant created successfully",
    UPDATED: "Restaurant updated successfully",
    DELETED: "Restaurant deleted successfully",
    NOT_FOUND: "Restaurant not found",
    FETCH_SUCCESS: "Restaurants fetched successfully",
  },

  IMAGE: {
    INVALID_TYPE: "Only JPG, JPEG, PNG and WEBP images are allowed",

    FILE_TOO_LARGE: "Image size cannot exceed 5MB",
  },

  PAGINATION: {
    INVALID_PAGE: "Invalid page number",
    INVALID_LIMIT: "Invalid limit value",
  },

  CLOUDINARY: {
    UPLOAD_FAILED: "Image upload failed",
  },
} as const;
