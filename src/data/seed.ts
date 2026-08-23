import type { Category, Jersey, JerseyImageType } from "../types";

// ----------------------------------------------------------------------------
// DEMO SEED DATA
// ----------------------------------------------------------------------------
// This is the initial dataset shown when the site loads for the first time.
// Everything here can be managed later from the Admin Dashboard — adding a
// category or jersey there does NOT require touching this file.
// ----------------------------------------------------------------------------

const now = new Date().toISOString();

export const seedCategories: Category[] = [
  {
    id: "cat-cricket",
    name: "Cricket Jersey",
    slug: "cricket-jersey",
    description: "Explore Cricket Jersey Designs crafted for teams and clubs.",
    image:
      "https://images.pexels.com/photos/30497263/pexels-photo-30497263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    createdAt: now,
  },
  {
    id: "cat-football",
    name: "Football Jersey",
    slug: "football-jersey",
    description: "Explore Football Jersey Designs built for pace and power.",
    image:
      "https://images.pexels.com/photos/35905601/pexels-photo-35905601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    createdAt: now,
  },
  {
    id: "cat-badminton",
    name: "Badminton Jersey",
    slug: "badminton-jersey",
    description: "Explore Badminton Jersey Designs made for agility and comfort.",
    image:
      "https://images.pexels.com/photos/8007405/pexels-photo-8007405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    createdAt: now,
  },
];

function makeImages(basePath: string, altBase: string) {
  const types: JerseyImageType[] = ["front", "back", "collar", "sleeve", "swing"];
  return types.map((type, index) => ({
    id: `${basePath}-${type}`,
    url: basePath,
    type,
    alt: `${altBase} — ${type} view`,
    order: index,
  }));
}

export const seedJerseys: Jersey[] = [
  {
    id: "jersey-cricket-1",
    name: "Royal Strike Cricket Jersey",
    slug: "royal-strike-cricket-jersey",
    categoryId: "cat-cricket",
    description:
      "A bold blue and gold design featuring dynamic diagonal striping, built for teams who play to win. Breathable fabric panels and a modern crew collar complete the look.",
    images: makeImages("/images/jerseys/cricket-1.jpg", "Royal Strike Cricket Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-cricket-2",
    name: "Blaze Cricket Jersey",
    slug: "blaze-cricket-jersey",
    categoryId: "cat-cricket",
    description:
      "Sharp red and black angular graphics give this jersey an aggressive, competitive edge. Designed with a comfortable v-neck collar and raglan sleeves.",
    images: makeImages("/images/jerseys/cricket-2.jpg", "Blaze Cricket Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-cricket-3",
    name: "Champion Cricket Jersey",
    slug: "champion-cricket-jersey",
    categoryId: "cat-cricket",
    description:
      "A vibrant blue-to-red gradient with clean white accents. Built for clubs that want a fresh, modern identity on the field.",
    images: makeImages("/images/jerseys/cricket-3.jpg", "Champion Cricket Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-football-1",
    name: "Thunder Strike FC Jersey",
    slug: "thunder-strike-fc-jersey",
    categoryId: "cat-football",
    description:
      "Classic red and white vertical stripes with a crest placement built for club pride. A timeless design for football clubs and academies.",
    images: makeImages("/images/jerseys/football-1.jpg", "Thunder Strike FC Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-football-2",
    name: "Victory Blue FC Jersey",
    slug: "victory-blue-fc-jersey",
    categoryId: "cat-football",
    description:
      "A sharp diagonal blue and white sash design paired with a modern polo collar — made for teams that stand out on the pitch.",
    images: makeImages("/images/jerseys/football-2.jpg", "Victory Blue FC Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-football-3",
    name: "Phoenix FC Jersey",
    slug: "phoenix-fc-jersey",
    categoryId: "cat-football",
    description:
      "Bold lightning graphics over a deep black base with fierce red highlights. Designed for teams with an aggressive playing style.",
    images: makeImages("/images/jerseys/football-3.jpg", "Phoenix FC Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-badminton-1",
    name: "Ace Badminton Jersey",
    slug: "ace-badminton-jersey",
    categoryId: "cat-badminton",
    description:
      "Lightweight white and blue paneling engineered for maximum breathability and freedom of movement on the court.",
    images: makeImages("/images/jerseys/badminton-1.jpg", "Ace Badminton Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-badminton-2",
    name: "Smash Pro Badminton Jersey",
    slug: "smash-pro-badminton-jersey",
    categoryId: "cat-badminton",
    description:
      "A striking red gradient fade with crisp white accents. Designed for players who want a bold court presence.",
    images: makeImages("/images/jerseys/badminton-2.jpg", "Smash Pro Badminton Jersey"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "jersey-badminton-3",
    name: "Rally Badminton Jersey",
    slug: "rally-badminton-jersey",
    categoryId: "cat-badminton",
    description:
      "Geometric blue and red triangle patterning with white trim, balancing a sporty look with clean, professional styling.",
    images: makeImages("/images/jerseys/badminton-3.jpg", "Rally Badminton Jersey"),
    createdAt: now,
    updatedAt: now,
  },
];
