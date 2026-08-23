import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

const focusAreas = [
  "Cricket jerseys",
  "Football jerseys",
  "Badminton jerseys",
  "Custom team jerseys",
  "Custom designs",
  "Team logos",
  "Player names & numbers",
  "Sponsor branding",
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-red-600">Our Story</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          About {siteConfig.brandName}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
          {siteConfig.brandName} specializes in custom sports jersey design. We work with clubs,
          schools, and teams to create bold, professional jersey identities — from concept
          sketches to production-ready designs.
        </p>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-blue-800 to-blue-950 p-8 text-white shadow-lg sm:p-10">
          <h2 className="text-xl font-bold">What We Design</h2>
          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {focusAreas.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-neutral-50 p-8 ring-1 ring-neutral-100 sm:p-10">
          <h2 className="text-xl font-bold text-neutral-900">Our Approach</h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            Every design starts with understanding your team's identity — colors, culture and
            competitive spirit. Our team then crafts detailed jersey concepts covering the front,
            back, collar, sleeve, and fabric finish, so you can see exactly how the final jersey
            will look before it goes into production.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            We take pride in clean execution, sharp printing detail, and durable, quality jersey
            production that holds up match after match.
          </p>
        </div>
      </div>

      <div className="mt-14 rounded-3xl border border-dashed border-neutral-300 p-8 text-center sm:p-12">
        <h3 className="text-2xl font-extrabold text-neutral-900">Like what you see?</h3>
        <p className="mt-2 text-neutral-600">Browse our full design catalog and reach out to get started.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:brightness-105"
        >
          Explore Jersey Designs
        </Link>
      </div>
    </div>
  );
}
