const CLOUD_NAME = "rac4kgyu";
const UPLOAD_PRESET = "jersey_images";
const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be smaller than 25 MB.");
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", UPLOAD_PRESET);
  body.append("folder", "jerseys");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body,
  });

  const payload = (await response.json().catch(() => null)) as
    | { secure_url?: string; error?: { message?: string } }
    | null;

  if (!response.ok || !payload?.secure_url) {
    throw new Error(payload?.error?.message || "Image upload failed. Please try again.");
  }

  return payload.secure_url;
}
