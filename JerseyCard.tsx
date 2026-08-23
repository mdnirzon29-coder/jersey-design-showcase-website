import { Link } from "react-router-dom";
import type { Jersey } from "../types";

export default function JerseyCard({ jersey }: { jersey: Jersey }) {
  const cover = jersey.images.find((i) => i.type === "front") ?? jersey.images[0];

  return (
    <Link
      to={`/jersey/${jersey.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {cover ? (
          <img
            src={cover.url}
            alt={cover.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400">No Image</div>
        )}
        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-black/10" />
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <h3 className="text-base font-bold text-neutral-900">{jersey.name}</h3>
        <span className="shrink-0 rounded-full border border-blue-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800 transition group-hover:bg-blue-800 group-hover:text-white">
          View
        </span>
      </div>
    </Link>
  );
}
