import { siteConfig, getWhatsAppLink, getFacebookLink } from "../config/siteConfig";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-red-600">Get In Touch</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          Contact {siteConfig.brandName}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-neutral-600 sm:text-lg">
          Found a design you love? Reach out and let's talk about bringing it to life for your
          team.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6">
        <div className="flex min-w-0 flex-col items-center rounded-3xl bg-neutral-50 p-4 text-center ring-1 ring-neutral-100 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/10 text-[#1fae56]">
            <svg viewBox="0 0 32 32" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
              <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.351.615 4.646 1.782 6.666L2.7 29.333l6.83-1.791a13.27 13.27 0 0 0 6.474 1.649h.006c7.362 0 13.333-5.97 13.333-13.333 0-3.56-1.387-6.907-3.905-9.425A13.24 13.24 0 0 0 16.004 2.667z" />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-bold text-neutral-900 sm:text-lg">Chat on WhatsApp</h3>
          <p className="mt-1.5 text-xs text-neutral-500 sm:text-sm">Fastest way to reach us about a design.</p>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[#25D366] px-3 py-2.5 text-xs font-bold text-white shadow transition hover:brightness-95 sm:px-6 sm:py-3 sm:text-sm"
          >
            Start Chat
          </a>
        </div>

        <div className="flex min-w-0 flex-col items-center rounded-3xl bg-neutral-50 p-4 text-center ring-1 ring-neutral-100 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800/10 text-blue-800">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-bold text-neutral-900 sm:text-lg">Message on Facebook</h3>
          <p className="mt-1.5 text-xs text-neutral-500 sm:text-sm">Visit our page for updates and messages.</p>
          <a
            href={getFacebookLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-full bg-blue-800 px-3 py-2.5 text-xs font-bold text-white shadow transition hover:brightness-110 sm:px-6 sm:py-3 sm:text-sm"
          >
            Facebook Page
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl bg-white p-8 text-center ring-1 ring-neutral-100 sm:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Phone</p>
          <p className="mt-1.5 font-semibold text-neutral-800">{siteConfig.phone}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email</p>
          <p className="mt-1.5 font-semibold text-neutral-800">{siteConfig.email}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Location</p>
          <p className="mt-1.5 font-semibold text-neutral-800">{siteConfig.address}</p>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
