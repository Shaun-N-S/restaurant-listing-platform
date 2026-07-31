export const VALIDATION = {
  NAME_MIN: 2,
  NAME_MAX: 80,

  ADDRESS_MIN: 5,
  ADDRESS_MAX: 200,

  CONTACT_MIN: 7,
  CONTACT_MAX: 20,

  NAME_REGEX: /[A-Za-z]/,

  ADDRESS_REGEX: /[A-Za-z0-9]/,

  MAX_FILE_SIZE: 5 * 1024 * 1024,

  ALLOWED_IMAGE_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ] as string[],

  CONTACT_DIGITS_MIN: 7,

  CONTACT_DIGITS_MAX: 10,
} as const;
