import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Category, Jersey, JerseyImage, JerseyImageType } from "../types";
import { seedCategories, seedJerseys } from "../data/seed";
import { slugify, uid } from "../utils/slug";
import { supabase } from "../lib/supabase";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  created_at: string;
};

type JerseyRow = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  description: string | null;
  images: unknown;
  created_at: string;
};

const IMAGE_TYPES: JerseyImageType[] = ["front", "back", "collar", "sleeve", "swing", "other"];

function normalizeImages(value: unknown, jerseyId: string, jerseyName: string): JerseyImage[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const candidate = item as Partial<JerseyImage> & { type?: string; url?: string };
    if (!candidate.url || typeof candidate.url !== "string") return [];
    const type = IMAGE_TYPES.includes(candidate.type as JerseyImageType)
      ? (candidate.type as JerseyImageType)
      : "other";
    return [
      {
        id: typeof candidate.id === "string" ? candidate.id : `${jerseyId}-image-${index + 1}`,
        url: candidate.url,
        type,
        alt: typeof candidate.alt === "string" ? candidate.alt : `${jerseyName} image ${index + 1}`,
        order: typeof candidate.order === "number" ? candidate.order : index,
      },
    ];
  });
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    image: row.image ?? "",
    createdAt: row.created_at,
  };
}

function mapJersey(row: JerseyRow): Jersey {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    categoryId: row.category_id,
    description: row.description ?? "",
    images: normalizeImages(row.images, row.id, row.name),
    createdAt: row.created_at,
    // The visual schema intentionally uses created_at only; keep the client type compatible.
    updatedAt: row.created_at,
  };
}

interface DataContextValue {
  categories: Category[];
  jerseys: Jersey[];
  loading: boolean;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getJerseyBySlug: (slug: string) => Jersey | undefined;
  getJerseysByCategory: (categoryId: string) => Jersey[];
  addCategory: (data: { name: string; description: string; image: string }) => Promise<Category>;
  updateCategory: (id: string, data: Partial<Pick<Category, "name" | "description" | "image">>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addJersey: (data: {
    name: string;
    categoryId: string;
    description: string;
    images: JerseyImage[];
  }) => Promise<Jersey>;
  updateJersey: (
    id: string,
    data: Partial<Pick<Jersey, "name" | "categoryId" | "description" | "images">>
  ) => Promise<void>;
  deleteJersey: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [jerseys, setJerseys] = useState<Jersey[]>(seedJerseys);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [categoryResult, jerseyResult] = await Promise.all([
      supabase.from("categories").select("*").order("created_at", { ascending: true }),
      supabase.from("jerseys").select("*").order("created_at", { ascending: true }),
    ]);

    if (!categoryResult.error && categoryResult.data) {
      setCategories((categoryResult.data as CategoryRow[]).map(mapCategory));
    }
    if (!jerseyResult.error && jerseyResult.data) {
      setJerseys((jerseyResult.data as JerseyRow[]).map(mapJersey));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
    const channel = supabase
      .channel("jersey-showcase-live-data")
      .on("postgres_changes", { event: "*", schema: "public", table: "categories" }, () => void refresh())
      .on("postgres_changes", { event: "*", schema: "public", table: "jerseys" }, () => void refresh())
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [refresh]);

  function getCategoryBySlug(slug: string) {
    return categories.find((category) => category.slug === slug);
  }

  function getJerseyBySlug(slug: string) {
    return jerseys.find((jersey) => jersey.slug === slug);
  }

  function getJerseysByCategory(categoryId: string) {
    return jerseys.filter((jersey) => jersey.categoryId === categoryId);
  }

  async function addCategory(data: { name: string; description: string; image: string }) {
    const newCategory: Category = {
      id: uid("cat"),
      name: data.name.trim(),
      slug: slugify(data.name),
      description: data.description.trim(),
      image: data.image,
      createdAt: new Date().toISOString(),
    };
    const { error } = await supabase.from("categories").insert({
      id: newCategory.id,
      name: newCategory.name,
      slug: newCategory.slug,
      description: newCategory.description,
      image: newCategory.image,
    });
    if (error) throw error;
    setCategories((previous) => [...previous, newCategory]);
    return newCategory;
  }

  async function updateCategory(id: string, data: Partial<Pick<Category, "name" | "description" | "image">>) {
    const existing = categories.find((category) => category.id === id);
    if (!existing) throw new Error("Category not found.");
    const updated = {
      ...existing,
      ...data,
      name: data.name?.trim() || existing.name,
      description: data.description?.trim() ?? existing.description,
      slug: data.name ? slugify(data.name) : existing.slug,
    };
    const { error } = await supabase
      .from("categories")
      .update({ name: updated.name, slug: updated.slug, description: updated.description, image: updated.image })
      .eq("id", id);
    if (error) throw error;
    setCategories((previous) => previous.map((category) => (category.id === id ? updated : category)));
  }

  async function deleteCategory(id: string) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    setCategories((previous) => previous.filter((category) => category.id !== id));
    setJerseys((previous) => previous.filter((jersey) => jersey.categoryId !== id));
  }

  async function addJersey(data: { name: string; categoryId: string; description: string; images: JerseyImage[] }) {
    const nowIso = new Date().toISOString();
    const newJersey: Jersey = {
      id: uid("jersey"),
      name: data.name.trim(),
      slug: slugify(data.name),
      categoryId: data.categoryId,
      description: data.description.trim(),
      images: data.images.map((image, index) => ({ ...image, order: index })),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    const { error } = await supabase.from("jerseys").insert({
      id: newJersey.id,
      name: newJersey.name,
      slug: newJersey.slug,
      category_id: newJersey.categoryId,
      description: newJersey.description,
      images: newJersey.images,
    });
    if (error) throw error;
    setJerseys((previous) => [...previous, newJersey]);
    return newJersey;
  }

  async function updateJersey(
    id: string,
    data: Partial<Pick<Jersey, "name" | "categoryId" | "description" | "images">>
  ) {
    const existing = jerseys.find((jersey) => jersey.id === id);
    if (!existing) throw new Error("Jersey not found.");
    const updated = {
      ...existing,
      ...data,
      name: data.name?.trim() || existing.name,
      description: data.description?.trim() ?? existing.description,
      slug: data.name ? slugify(data.name) : existing.slug,
      images: data.images?.map((image, index) => ({ ...image, order: index })) || existing.images,
      updatedAt: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("jerseys")
      .update({
        name: updated.name,
        slug: updated.slug,
        category_id: updated.categoryId,
        description: updated.description,
        images: updated.images,
      })
      .eq("id", id);
    if (error) throw error;
    setJerseys((previous) => previous.map((jersey) => (jersey.id === id ? updated : jersey)));
  }

  async function deleteJersey(id: string) {
    const { error } = await supabase.from("jerseys").delete().eq("id", id);
    if (error) throw error;
    setJerseys((previous) => previous.filter((jersey) => jersey.id !== id));
  }

  return (
    <DataContext.Provider
      value={{
        categories,
        jerseys,
        loading,
        getCategoryBySlug,
        getJerseyBySlug,
        getJerseysByCategory,
        addCategory,
        updateCategory,
        deleteCategory,
        addJersey,
        updateJersey,
        deleteJersey,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
