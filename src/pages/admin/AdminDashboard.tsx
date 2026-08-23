import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function AdminDashboard() {
  const { categories, jerseys } = useData();

  return (
    <div>
      <h2 className="text-xl font-extrabold text-neutral-900">Overview</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Categories</p>
          <p className="mt-2 text-3xl font-extrabold text-blue-800">{categories.length}</p>
          <Link to="/admin/categories" className="mt-4 inline-block text-sm font-semibold text-blue-800 hover:text-red-600">
            Manage Categories →
          </Link>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Jersey Designs</p>
          <p className="mt-2 text-3xl font-extrabold text-red-600">{jerseys.length}</p>
          <Link to="/admin/jerseys" className="mt-4 inline-block text-sm font-semibold text-blue-800 hover:text-red-600">
            Manage Jerseys →
          </Link>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Quick Action</p>
          <p className="mt-2 text-sm text-neutral-600">Add a brand-new jersey design to the catalog.</p>
          <Link
            to="/admin/jerseys/new"
            className="mt-4 inline-block rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:brightness-105"
          >
            + Add Jersey
          </Link>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-500">
        Live admin mode is enabled. Changes are stored in Supabase and synchronized across devices;
        new images use Cloudinary's unsigned free-tier upload endpoint.
      </div>
    </div>
  );
}
