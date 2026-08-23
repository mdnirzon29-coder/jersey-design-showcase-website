import { useData } from "../context/DataContext";
import CategoryCard from "../components/CategoryCard";
import EmptyState from "../components/EmptyState";

export default function Categories() {
  const { categories } = useData();

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-red-600">
          AR Entertainment
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          Choose Your Sport
        </h1>
        <p className="mt-4 text-base text-neutral-600 sm:text-lg">
          Explore our jersey designs — pick a category to browse the full collection.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-8 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="mt-10">
          <EmptyState message="No categories available yet." />
        </div>
      )}
    </div>
  );
}
