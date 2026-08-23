import { Link } from "react-router-dom";
import { siteConfig, getWhatsAppLink, getFacebookLink } from "../config/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={`${import.meta.env.BASE_URL}images/brand/ar-logo.png`}
              alt={`${siteConfig.brandName} logo`}
              className="h-10 w-12 object-contain"
            />
            <span className="text-lg font-extrabold text-white">{siteConfig.brandName}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="transition hover:text-red-500">Categories</Link>
            </li>
            <li>
              <Link to="/about" className="transition hover:text-red-500">About</Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-red-500">Contact</Link>
            </li>
            <li>
              <Link to="/admin/login" className="text-neutral-500 transition hover:text-neutral-300">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Get In Touch</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.email}</li>
            <li>{siteConfig.address}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-white transition hover:bg-[#25D366]"
            >
              <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5">
                <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.351.615 4.646 1.782 6.666L2.7 29.333l6.83-1.791a13.27 13.27 0 0 0 6.474 1.649h.006c7.362 0 13.333-5.97 13.333-13.333 0-3.56-1.387-6.907-3.905-9.425A13.24 13.24 0 0 0 16.004 2.667z" />
              </svg>
            </a>
            <a
              href={getFacebookLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-white transition hover:bg-blue-700"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-5 text-center text-xs text-neutral-500">
        <p>© 2026 {siteConfig.brandName}. All Rights Reserved.</p>
        <p className="mt-1">Design and Designed &amp; Developed by Toufique Islam</p>
      </div>
    </footer>
  );
}
