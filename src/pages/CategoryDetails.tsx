import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import JerseyCard from "../components/JerseyCard";
import EmptyState from "../components/EmptyState";

export default function CategoryDetails() {
  const { slug } = useParams();
  const { getCategoryBySlug, getJerseysByCategory } = useData();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Category not found</h1>
        <Link to="/" className="mt-4 inline-block text-blue-800 underline">
          Back to categories
        </Link>
      </div>
    );
  }

  const jerseys = getJerseysByCategory(category.id);

  return (
    <div>
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-red-400">
            AR Entertainment
          </span>
          <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/85 sm:text-base">{category.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:text-red-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            All Categories
          </Link>
          <span className="text-sm font-medium text-neutral-500">
            {jerseys.length} design{jerseys.length === 1 ? "" : "s"}
          </span>
        </div>

        {jerseys.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {jerseys.map((jersey) => (
              <JerseyCard key={jersey.id} jersey={jersey} />
            ))}
          </div>
        ) : (
          <EmptyState message="No jersey designs available yet." />
        )}
      </div>
    </div>
  );
}
