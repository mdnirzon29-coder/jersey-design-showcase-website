import { useEffect, useRef, useState } from "react";
import type { JerseyImage } from "../types";
import { IMAGE_TYPE_LABELS } from "../types";

interface CropStyle {
  objectPosition: string;
  transform: string;
}

// Demo placeholder jerseys reuse one photo per design. To make each labelled
// section feel distinct until real per-angle photography is uploaded by the
// admin, we frame a different region of the same image for each image type.
// Once an admin uploads a real, dedicated photo for a given type, that image
// is shown as-is (no crop is applied) because its `url` will differ from the
// jersey's shared placeholder image.
const CROPS: Record<string, CropStyle> = {
  front: { objectPosition: "50% 42%", transform: "scale(1)" },
  back: { objectPosition: "50% 42%", transform: "scale(1) scaleX(-1)" },
  collar: { objectPosition: "50% 6%", transform: "scale(2.4)" },
  sleeve: { objectPosition: "8% 38%", transform: "scale(2.1)" },
  swing: { objectPosition: "50% 78%", transform: "scale(2.6)" },
  other: { objectPosition: "50% 50%", transform: "scale(1)" },
};

function getCropStyle(image: JerseyImage, sameUrlCount: number): React.CSSProperties {
  // Only apply the simulated crop when multiple images share the same URL
  // (i.e. this is placeholder data). Unique uploaded images render normally.
  if (sameUrlCount <= 1) return { objectPosition: "50% 50%" };
  const crop = CROPS[image.type] ?? CROPS.other;
  return { objectPosition: crop.objectPosition, transform: crop.transform };
}

export default function JerseyGallery({
  images,
  jerseyName,
}: {
  images: JerseyImage[];
  jerseyName: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const urlCounts = images.reduce<Record<string, number>>((acc, img) => {
    acc[img.url] = (acc[img.url] ?? 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
      else setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    touchStartX.current = null;
  }

  if (images.length === 0) {
    return (
      <div className="rounded-2xl bg-neutral-100 p-12 text-center text-neutral-500">
        No design images available yet.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-16 md:gap-24">
        {images.map((image, index) => (
          <figure key={image.id} className="mx-auto w-full max-w-5xl">
            <div className="mb-4 flex items-center justify-center gap-3 sm:mb-6">
              <span className="h-px w-8 bg-red-600 sm:w-14" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-blue-800 sm:text-sm">
                {IMAGE_TYPE_LABELS[image.type]}
              </span>
              <span className="h-px w-8 bg-red-600 sm:w-14" />
            </div>
            <button
              onClick={() => setLightboxIndex(index)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-xl ring-1 ring-black/5"
              aria-label={`Open ${IMAGE_TYPE_LABELS[image.type]} fullscreen`}
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  style={getCropStyle(image, urlCounts[image.url])}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m11-5v3a2 2 0 0 1-2 2h-3" />
                </svg>
                View Fullscreen
              </span>
            </button>
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mx-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setLightboxIndex(index)}
              className="h-16 w-16 overflow-hidden rounded-lg ring-2 ring-transparent transition hover:ring-red-600 sm:h-20 sm:w-20"
              aria-label={`Jump to ${IMAGE_TYPE_LABELS[image.type]}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                style={getCropStyle(image, urlCounts[image.url])}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-white/80">
              {jerseyName} — {IMAGE_TYPE_LABELS[images[lightboxIndex].type]}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close fullscreen view"
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-4 sm:px-16">
            <button
              onClick={() =>
                setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
              }
              aria-label="Previous image"
              className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-4 sm:h-11 sm:w-11"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              style={getCropStyle(images[lightboxIndex], urlCounts[images[lightboxIndex].url])}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            />

            <button
              onClick={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))}
              aria-label="Next image"
              className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-4 sm:h-11 sm:w-11"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 pb-6 sm:hidden">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === lightboxIndex ? "w-6 bg-red-500" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
          <p className="pb-6 text-center text-xs text-white/50 sm:hidden">Swipe left or right to navigate</p>
        </div>
      )}
    </div>
  );
}
