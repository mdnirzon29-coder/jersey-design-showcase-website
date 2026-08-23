import { useSearchParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import JerseyCard from "../components/JerseyCard";
import CategoryCard from "../components/CategoryCard";
import EmptyState from "../components/EmptyState";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const { categories, jerseys } = useData();

  const matchedCategories = query
    ? categories.filter((c) => c.name.toLowerCase().includes(query))
    : [];

  const matchedJerseys = query
    ? jerseys.filter((j) => {
        const category = categories.find((c) => c.id === j.categoryId);
        return (
          j.name.toLowerCase().includes(query) ||
          (category && category.name.toLowerCase().includes(query))
        );
      })
    : [];

  const hasResults = matchedCategories.length > 0 || matchedJerseys.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">
        Search results for “{params.get("q")}”
      </h1>

      {!hasResults && (
        <div className="mt-8">
          <EmptyState message="No designs found." />
        </div>
      )}

      {matchedCategories.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-lg font-bold text-neutral-800">Categories</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {matchedJerseys.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-lg font-bold text-neutral-800">Jersey Designs</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {matchedJerseys.map((jersey) => (
              <JerseyCard key={jersey.id} jersey={jersey} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
