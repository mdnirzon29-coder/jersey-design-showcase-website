import { useRef, useState } from "react";
import { useData } from "../../context/DataContext";
import type { Category } from "../../types";
import { uploadImage } from "../../lib/cloudinary";

interface FormState {
  id?: string;
  name: string;
  description: string;
  image: string;
}

const emptyForm: FormState = { name: "", description: "", image: "" };

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function openNew() {
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(category: Category) {
    setForm({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setShowForm(true);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const image = await uploadImage(file);
      setForm((current) => ({ ...current, image }));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.image) {
      setError("Category name and image are required.");
      return;
    }
    setSaving(true);
    try {
      if (form.id) {
        await updateCategory(form.id, {
          name: form.name,
          description: form.description,
          image: form.image,
        });
      } else {
        await addCategory({ name: form.name, description: form.description, image: form.image });
      }
      setShowForm(false);
      setForm(emptyForm);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save this category.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-extrabold text-neutral-900">Categories</h2>
        <button
          onClick={openNew}
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:brightness-105"
        >
          + Add Category
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100">
            <img src={category.image} alt={category.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-neutral-900">{category.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{category.description}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEdit(category)}
                  className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(category)}
                  className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-500">No categories yet. Add the first one.</p>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-neutral-900">
              {form.id ? "Edit Category" : "Add Category"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Category Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  placeholder="e.g. Basketball Jersey"
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  placeholder="Explore Basketball Jersey Designs"
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Category Image
                </label>
                {form.image && (
                  <img src={form.image} alt="Preview" className="mb-2 h-32 w-full rounded-lg object-cover" />
                )}
                <input ref={fileRef} type="file" accept="image/*" onChange={(e) => void handleFile(e)} disabled={uploading} className="text-sm disabled:opacity-50" />
                <input
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="or paste an image URL"
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-blue-700"
                />
              </div>
              {error && <p className="text-sm font-medium text-red-600">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
                >
                  {saving ? "Saving…" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-lg font-bold text-neutral-900">Delete Category?</h3>
            <p className="mt-2 text-sm text-neutral-500">
              Are you sure you want to delete "{deleteTarget.name}"? Jerseys in this category will
              also be removed.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={async () => {
                  setError("");
                  setDeleting(true);
                  try {
                    await deleteCategory(deleteTarget.id);
                    setDeleteTarget(null);
                  } catch (deleteError) {
                    setError(deleteError instanceof Error ? deleteError.message : "Could not delete this category.");
                  } finally {
                    setDeleting(false);
                  }
                }}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
