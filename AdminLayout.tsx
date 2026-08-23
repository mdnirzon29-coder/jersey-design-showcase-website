import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { siteConfig } from "../../config/siteConfig";

const tabs = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/categories", label: "Categories", end: false },
  { to: "/admin/jerseys", label: "Jerseys", end: false },
];

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="min-h-[80vh] bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-red-600">Admin Panel</p>
            <h1 className="text-lg font-extrabold text-neutral-900">{siteConfig.brandName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-semibold text-blue-800 hover:text-red-600">
              View Website
            </Link>
            <button
              onClick={logout}
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-blue-800 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}
