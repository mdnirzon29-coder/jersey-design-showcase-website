import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import JerseyGallery from "../components/JerseyGallery";
import ContactCTA from "../components/ContactCTA";
import { IMAGE_TYPE_ORDER } from "../types";

export default function JerseyDetails() {
  const { slug } = useParams();
  const { getJerseyBySlug, categories } = useData();
  const jersey = slug ? getJerseyBySlug(slug) : undefined;

  if (!jersey) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Design not found</h1>
        <Link to="/" className="mt-4 inline-block text-blue-800 underline">
          Back to categories
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === jersey.categoryId);
  const sortedImages = [...jersey.images].sort(
    (a, b) => IMAGE_TYPE_ORDER.indexOf(a.type) - IMAGE_TYPE_ORDER.indexOf(b.type) || a.order - b.order
  );

  return (
    <div>
      <div className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:py-14">
          {category && (
            <Link
              to={`/category/${category.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-blue-800 hover:text-red-600"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              {category.name}
            </Link>
          )}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            {jersey.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600">{jersey.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <JerseyGallery images={sortedImages} jerseyName={jersey.name} />
      </div>

      <div className="border-t border-neutral-100 bg-neutral-50">
        <ContactCTA jerseyName={jersey.name} />
      </div>
    </div>
  );
}
