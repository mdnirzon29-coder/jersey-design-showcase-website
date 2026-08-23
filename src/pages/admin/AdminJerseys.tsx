import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import type { Jersey } from "../../types";

export default function AdminJerseys() {
  const { jerseys, categories, deleteJersey } = useData();
  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<Jersey | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const filtered = filter === "all" ? jerseys : jerseys.filter((j) => j.categoryId === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-extrabold text-neutral-900">Jersey Designs</h2>
        <Link
          to="/admin/jerseys/new"
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:brightness-105"
        >
          + Add Jersey
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
            filter === "all" ? "bg-blue-800 text-white" : "bg-neutral-100 text-neutral-600"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              filter === c.id ? "bg-blue-800 text-white" : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((jersey) => {
          const category = categories.find((c) => c.id === jersey.categoryId);
          const cover = jersey.images[0];
          return (
            <div key={jersey.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100">
              {cover ? (
                <img src={cover.url} alt={jersey.name} className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-neutral-100 text-neutral-400">
                  No Image
                </div>
              )}
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-800">
                  {category?.name ?? "Uncategorized"}
                </p>
                <h3 className="mt-0.5 font-bold text-neutral-900">{jersey.name}</h3>
                <p className="mt-1 text-xs text-neutral-400">{jersey.images.length} image(s)</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/admin/jerseys/edit/${jersey.id}`}
                    className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-center text-sm font-semibold text-blue-800 hover:bg-blue-100"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(jersey)}
                    className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-500">No jerseys found in this category.</p>
      )}

      {error && <p className="mt-5 text-sm font-medium text-red-600">{error}</p>}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-lg font-bold text-neutral-900">Delete Jersey Design?</h3>
            <p className="mt-2 text-sm text-neutral-500">
              Are you sure you want to delete this jersey design "{deleteTarget.name}"?
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
                    await deleteJersey(deleteTarget.id);
                    setDeleteTarget(null);
                  } catch (deleteError) {
                    setError(deleteError instanceof Error ? deleteError.message : "Could not delete this jersey.");
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
