import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { siteConfig } from "../../config/siteConfig";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) {
      const from = (location.state as { from?: string })?.from || "/admin";
      navigate(from, { replace: true });
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-neutral-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl ring-1 ring-neutral-100">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-blue-800 to-blue-900 text-lg font-black text-white">
            AR
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-neutral-900">Admin Login</h1>
          <p className="mt-1 text-sm text-neutral-500">{siteConfig.brandName} Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-800 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-900 disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Signing In…" : "Log In"}
          </button>
        </form>

        <p className="mt-6 rounded-lg bg-neutral-50 p-3 text-center text-xs text-neutral-500">
          Use the admin email and password created in Supabase Authentication.
        </p>

        <Link to="/" className="mt-6 block text-center text-sm font-semibold text-blue-800 hover:text-red-600">
          ← Back to Website
        </Link>
      </div>
    </div>
  );
}
