import React, { createContext, useContext, useEffect, useState } from "react";
import type { Category, Jersey, JerseyImage } from "../types";
import { seedCategories, seedJerseys } from "../data/seed";
import { slugify, uid } from "../utils/slug";

// ============================================================================
// DATA CONTEXT (DEMO PERSISTENCE LAYER)
// ----------------------------------------------------------------------------
// Categories & jerseys are persisted to localStorage so that admin changes
// survive a page refresh in this frontend-only demo.
//
// TO CONNECT A REAL DATABASE:
//   Replace the load/save logic below with API calls (REST/GraphQL) to your
//   backend, or with a service such as Firebase Firestore / Supabase.
//   Keep the same function signatures (addCategory, updateJersey, etc.) so
//   the rest of the app does not need to change.
// ============================================================================

const CATEGORIES_KEY = "ar_ent_categories";
const JERSEYS_KEY = "ar_ent_jerseys";

function loadCategories(): Category[] {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return seedCategories;
}

function loadJerseys(): Jersey[] {
  try {
    const raw = localStorage.getItem(JERSEYS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return seedJerseys;
}

interface DataContextValue {
  categories: Category[];
  jerseys: Jersey[];
  getCategoryBySlug: (slug: string) => Category | undefined;
  getJerseyBySlug: (slug: string) => Jersey | undefined;
  getJerseysByCategory: (categoryId: string) => Jersey[];
  addCategory: (data: { name: string; description: string; image: string }) => Category;
  updateCategory: (id: string, data: Partial<Pick<Category, "name" | "description" | "image">>) => void;
  deleteCategory: (id: string) => void;
  addJersey: (data: {
    name: string;
    categoryId: string;
    description: string;
    images: JerseyImage[];
  }) => Jersey;
  updateJersey: (
    id: string,
    data: Partial<Pick<Jersey, "name" | "categoryId" | "description" | "images">>
  ) => void;
  deleteJersey: (id: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(loadCategories);
  const [jerseys, setJerseys] = useState<Jersey[]>(loadJerseys);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(JERSEYS_KEY, JSON.stringify(jerseys));
  }, [jerseys]);

  function getCategoryBySlug(slug: string) {
    return categories.find((c) => c.slug === slug);
  }

  function getJerseyBySlug(slug: string) {
    return jerseys.find((j) => j.slug === slug);
  }

  function getJerseysByCategory(categoryId: string) {
    return jerseys.filter((j) => j.categoryId === categoryId);
  }

  function addCategory(data: { name: string; description: string; image: string }) {
    const newCategory: Category = {
      id: uid("cat"),
      name: data.name,
      slug: slugify(data.name),
      description: data.description,
      image: data.image,
      createdAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }

  function updateCategory(
    id: string,
    data: Partial<Pick<Category, "name" | "description" | "image">>
  ) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...data,
              slug: data.name ? slugify(data.name) : c.slug,
            }
          : c
      )
    );
  }

  function deleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setJerseys((prev) => prev.filter((j) => j.categoryId !== id));
  }

  function addJersey(data: {
    name: string;
    categoryId: string;
    description: string;
    images: JerseyImage[];
  }) {
    const nowIso = new Date().toISOString();
    const newJersey: Jersey = {
      id: uid("jersey"),
      name: data.name,
      slug: slugify(data.name),
      categoryId: data.categoryId,
      description: data.description,
      images: data.images,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    setJerseys((prev) => [...prev, newJersey]);
    return newJersey;
  }

  function updateJersey(
    id: string,
    data: Partial<Pick<Jersey, "name" | "categoryId" | "description" | "images">>
  ) {
    setJerseys((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              ...data,
              slug: data.name ? slugify(data.name) : j.slug,
              updatedAt: new Date().toISOString(),
            }
          : j
      )
    );
  }

  function deleteJersey(id: string) {
    setJerseys((prev) => prev.filter((j) => j.id !== id));
  }

  return (
    <DataContext.Provider
      value={{
        categories,
        jerseys,
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
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
