import { getFacebookLink, siteConfig } from "../config/siteConfig";
import WhatsAppButton from "./WhatsAppButton";

export default function ContactCTA({ jerseyName }: { jerseyName?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">
        Like this design?
      </span>
      <h2 className="mt-3 text-3xl font-extrabold text-neutral-900 sm:text-4xl">
        Interested in this design?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-neutral-600">
        Contact <span className="font-semibold text-blue-800">{siteConfig.brandName}</span> to
        discuss custom colors, team names, numbers, and sponsor branding for this jersey.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <WhatsAppButton jerseyName={jerseyName} floating={false} />
        <a
          href={getFacebookLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-800/20 transition hover:brightness-110 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Message on Facebook
        </a>
      </div>
      <p className="mt-6 text-sm text-neutral-500">We usually respond within a few hours.</p>
    </section>
  );
}
