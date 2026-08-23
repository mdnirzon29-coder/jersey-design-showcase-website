export type JerseyImageType =
  | "front"
  | "back"
  | "collar"
  | "sleeve"
  | "swing"
  | "other";

export interface JerseyImage {
  id: string;
  url: string;
  type: JerseyImageType;
  alt: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
}

export interface Jersey {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  images: JerseyImage[];
  createdAt: string;
  updatedAt: string;
}

export const IMAGE_TYPE_LABELS: Record<JerseyImageType, string> = {
  front: "Front View",
  back: "Back View",
  collar: "Collar View",
  sleeve: "Sleeve View",
  swing: "Swing Quality",
  other: "Additional View",
};

export const IMAGE_TYPE_ORDER: JerseyImageType[] = [
  "front",
  "back",
  "collar",
  "sleeve",
  "swing",
  "other",
];
