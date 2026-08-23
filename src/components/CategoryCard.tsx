import { Link } from "react-router-dom";
import type { Category } from "../types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-red-600 via-blue-700 to-red-600" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-white drop-shadow-sm sm:text-2xl">
            {category.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/85">{category.description}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[11px] font-bold text-blue-800 shadow transition group-hover:bg-red-600 group-hover:text-white sm:mt-4 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm">
            View Designs
            <svg
              className="h-3.5 w-3.5 transition group-hover:translate-x-1 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
