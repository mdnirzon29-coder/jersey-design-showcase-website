import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import type { JerseyImage, JerseyImageType } from "../../types";
import { IMAGE_TYPE_LABELS, IMAGE_TYPE_ORDER } from "../../types";
import { uid } from "../../utils/slug";

export default function AdminJerseyForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { categories, jerseys, addJersey, updateJersey } = useData();

  const existing = isEdit ? jerseys.find((j) => j.id === id) : undefined;

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<JerseyImage[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setCategoryId(existing.categoryId);
      setDescription(existing.description);
      setImages(existing.images);
    } else if (categories[0]) {
      setCategoryId(categories[0].id);
    }
  }, [existing, categories]);

  function addImageSlot() {
    setImages((prev) => [
      ...prev,
      { id: uid("img"), url: "", type: "other", alt: name || "Jersey image", order: prev.length },
    ]);
  }

  function updateImage(imgId: string, patch: Partial<JerseyImage>) {
    setImages((prev) => prev.map((img) => (img.id === imgId ? { ...img, ...patch } : img)));
  }

  function removeImage(imgId: string) {
    setImages((prev) => prev.filter((img) => img.id !== imgId).map((img, i) => ({ ...img, order: i })));
  }

  function moveImage(imgId: string, direction: -1 | 1) {
    setImages((prev) => {
      const index = prev.findIndex((img) => img.id === imgId);
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((img, i) => ({ ...img, order: i }));
    });
  }

  function handleFileUpload(imgId: string, file: File) {
    const reader = new FileReader();
    reader.onload = () => updateImage(imgId, { url: reader.result as string });
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Jersey name is required.");
    if (!categoryId) return setError("Please select a category.");
    const validImages = images.filter((img) => img.url);
    if (validImages.length === 0) return setError("Add at least one image.");

    if (isEdit && existing) {
      updateJersey(existing.id, { name, categoryId, description, images: validImages });
    } else {
      addJersey({ name, categoryId, description, images: validImages });
    }
    navigate("/admin/jerseys");
  }

  if (isEdit && !existing) {
    return (
      <div className="text-center text-neutral-500">
        Jersey not found.{" "}
        <Link to="/admin/jerseys" className="text-blue-800 underline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-xl font-extrabold text-neutral-900">
        {isEdit ? "Edit Jersey Design" : "Add New Jersey Design"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Jersey Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Royal Strike Cricket Jersey"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe the design concept, colors and fabric details..."
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wide text-neutral-500">
              Design Images (Front, Back, Collar, Sleeve, Swing Quality...)
            </label>
            <button
              type="button"
              onClick={addImageSlot}
              className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100"
            >
              + Add Image
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {images.map((img, index) => (
              <div key={img.id} className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4 sm:flex-row sm:items-center">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  {img.url ? (
                    <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={img.type}
                      onChange={(e) => updateImage(img.id, { type: e.target.value as JerseyImageType })}
                      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm outline-none"
                    >
                      {IMAGE_TYPE_ORDER.map((t) => (
                        <option key={t} value={t}>
                          {IMAGE_TYPE_LABELS[t]}
                        </option>
                      ))}
                    </select>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(img.id, e.target.files[0])}
                      className="text-xs"
                    />
                  </div>
                  <input
                    value={img.url.startsWith("data:") ? "" : img.url}
                    onChange={(e) => updateImage(img.id, { url: e.target.value })}
                    placeholder="or paste an image URL"
                    className="w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-xs outline-none"
                  />
                </div>
                <div className="flex shrink-0 gap-1.5 sm:flex-col">
                  <button
                    type="button"
                    onClick={() => moveImage(img.id, -1)}
                    disabled={index === 0}
                    className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-bold text-neutral-600 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(img.id, 1)}
                    disabled={index === images.length - 1}
                    className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-bold text-neutral-600 disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {images.length === 0 && (
              <p className="text-sm text-neutral-400">No images added yet. Click "+ Add Image" to start.</p>
            )}
          </div>
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Link
            to="/admin/jerseys"
            className="flex-1 rounded-lg bg-neutral-100 px-4 py-2.5 text-center text-sm font-semibold text-neutral-700 hover:bg-neutral-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
          >
            {isEdit ? "Save Changes" : "Add Jersey"}
          </button>
        </div>
      </form>
    </div>
  );
}
