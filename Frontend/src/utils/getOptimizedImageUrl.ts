const CLOUDINARY_MARKER = "res.cloudinary.com";
const UPLOAD_SEGMENT = "/upload/";

export const getOptimizedImageUrl = (
  url?: string | null,
): string | undefined => {
  if (!url) return url ?? undefined;

  if (!url.includes(CLOUDINARY_MARKER)) return url;

  const uploadIndex = url.indexOf(UPLOAD_SEGMENT);
  if (uploadIndex === -1) return url;

  const afterUpload = url.slice(uploadIndex + UPLOAD_SEGMENT.length);
  if (afterUpload.startsWith("f_auto")) return url;

  return `${url.slice(0, uploadIndex + UPLOAD_SEGMENT.length)}f_auto,q_auto/${afterUpload}`;
};
