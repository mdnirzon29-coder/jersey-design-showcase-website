import { getWhatsAppLink } from "../config/siteConfig";

interface Props {
  jerseyName?: string;
  floating?: boolean;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.351.615 4.646 1.782 6.666L2.7 29.333l6.83-1.791a13.27 13.27 0 0 0 6.474 1.649h.006c7.362 0 13.333-5.97 13.333-13.333 0-3.56-1.387-6.907-3.905-9.425A13.24 13.24 0 0 0 16.004 2.667zm0 24.4h-.005a11.03 11.03 0 0 1-5.62-1.539l-.403-.24-4.053 1.063 1.082-3.951-.263-.406a11.02 11.02 0 0 1-1.692-5.894c0-6.106 4.968-11.073 11.078-11.073 2.958 0 5.739 1.154 7.83 3.248a10.996 10.996 0 0 1 3.24 7.828c0 6.106-4.968 11.073-11.194 10.964zm6.07-8.294c-.332-.166-1.965-.97-2.27-1.08-.305-.111-.527-.166-.749.166-.222.333-.86 1.08-1.054 1.302-.194.222-.388.25-.72.083-.332-.166-1.402-.517-2.67-1.65-.987-.88-1.653-1.966-1.847-2.298-.194-.333-.021-.513.146-.679.15-.149.332-.388.499-.582.166-.194.221-.333.332-.555.11-.222.055-.416-.028-.582-.083-.166-.749-1.806-1.027-2.474-.27-.65-.545-.562-.749-.572l-.638-.011a1.224 1.224 0 0 0-.887.416c-.305.333-1.165 1.138-1.165 2.777s1.193 3.222 1.359 3.444c.166.222 2.347 3.583 5.686 5.024.795.343 1.415.548 1.898.7.797.253 1.523.217 2.097.132.64-.096 1.965-.803 2.242-1.579.277-.777.277-1.442.194-1.58-.083-.138-.305-.221-.638-.388z" />
    </svg>
  );
}

export default function WhatsAppButton({ jerseyName, floating = true }: Props) {
  const href = getWhatsAppLink(jerseyName);

  if (!floating) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition hover:brightness-95 active:scale-95"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Chat on WhatsApp
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition hover:scale-105 active:scale-95 md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
