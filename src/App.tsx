import { HashRouter, Routes, Route } from "react-router-dom";
import { DataProvider, useData } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProtectedRoute from "./components/ProtectedRoute";

import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import JerseyDetails from "./pages/JerseyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminJerseys from "./pages/admin/AdminJerseys";
import AdminJerseyForm from "./pages/admin/AdminJerseyForm";

function LiveDataGate({ children }: { children: React.ReactNode }) {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <div>
          <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-gradient-to-br from-red-600 via-blue-700 to-blue-900" />
          <p className="mt-4 text-sm font-medium text-neutral-500">Loading live designs…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LiveDataGate><SiteLayout><Categories /></SiteLayout></LiveDataGate>} />
            <Route path="/category/:slug" element={<LiveDataGate><SiteLayout><CategoryDetails /></SiteLayout></LiveDataGate>} />
            <Route path="/jersey/:slug" element={<LiveDataGate><SiteLayout><JerseyDetails /></SiteLayout></LiveDataGate>} />
            <Route path="/about" element={<LiveDataGate><SiteLayout><About /></SiteLayout></LiveDataGate>} />
            <Route path="/contact" element={<LiveDataGate><SiteLayout><Contact /></SiteLayout></LiveDataGate>} />
            <Route path="/search" element={<LiveDataGate><SiteLayout><SearchResults /></SiteLayout></LiveDataGate>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="jerseys" element={<AdminJerseys />} />
              <Route path="jerseys/new" element={<AdminJerseyForm />} />
              <Route path="jerseys/edit/:id" element={<AdminJerseyForm />} />
            </Route>

            <Route
              path="*"
              element={
                <LiveDataGate>
                  <SiteLayout>
                    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
                      <h1 className="text-3xl font-extrabold text-neutral-900">Page Not Found</h1>
                      <p className="mt-2 text-neutral-500">The page you're looking for doesn't exist.</p>
                    </div>
                  </SiteLayout>
                </LiveDataGate>
              }
            />
          </Routes>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}
