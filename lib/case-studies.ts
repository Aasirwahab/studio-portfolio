import { IMAGES } from "./images";

/**
 * Long-form case studies. Not every project in PRODUCTS has one — the grid
 * only links a card through when `bySlug` finds a match for its name, so a
 * project can sit in the index until its write-up is ready.
 */
export interface CaseStudy {
  slug: string;
  /** Must match the `name` in PRODUCTS / `title` in PROJECTS to link up. */
  name: string;
  tag: string;
  year: string;
  location: string;
  /** One line under the hero, and the meta description. */
  summary: string;
  hero: string;
  heroAlt: string;
  meta: { label: string; value: string }[];
  brief: { title: string; body: string[] };
  approach: {
    no: string;
    title: string;
    body: string;
    image: string;
    alt: string;
  }[];
  gallery: { src: string; alt: string; caption: string }[];
  results: { to: number; suffix: string; label: string }[];
  quote: { text: string; name: string; role: string };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "maison-lune",
    name: "Maison Lune",
    tag: "Campaign",
    year: "2026",
    location: "Paris, FR",
    summary:
      "A Paris fragrance house with a finished product and no face. We built the identity and the launch campaign in one pass — and doubled pre-orders in launch week.",
    hero: IMAGES.project1,
    heroAlt: "The Maison Lune launch campaign, shot in Paris",
    meta: [
      { label: "Client", value: "Maison Lune" },
      { label: "Sector", value: "Fragrance" },
      { label: "Year", value: "2026" },
      { label: "Scope", value: "Identity, campaign, launch film" },
    ],
    brief: {
      title: "A finished bottle and nothing to say about it",
      body: [
        "Maison Lune came to us eleven weeks out from a launch date they could not move. The fragrance was finished, the bottle was tooled, the retail partner was signed. What did not exist was a reason for anyone to care — no identity, no campaign, no story beyond the founder's own.",
        "Three studios had already pitched them decks built on the same reference: moonlight, silver, a woman alone in a Paris apartment. Accurate to the name and invisible on a shelf. Our first meeting was spent arguing that the name was the trap, not the brief.",
      ],
    },
    approach: [
      {
        no: "01",
        title: "We threw out the moon",
        body: "Lune is the name, not the concept. We reframed the house around the hour rather than the object — the specific blue of the ten minutes after sunset, when a city switches its lights on but the sky has not given up. That gave us a palette nobody else in the category was using and a shoot window we had to earn.",
        image: IMAGES.panel1,
        alt: "Palette studies for the Maison Lune identity",
      },
      {
        no: "02",
        title: "One hour a day, for nine days",
        body: "The whole campaign was shot in that window and only in that window — roughly forty usable minutes per evening, across nine evenings in the 11th. It is an absurd way to schedule a shoot and it is the reason the images do not look like anyone else's. No colour grade is doing the work here; the light is real.",
        image: IMAGES.feature2,
        alt: "On set for the Maison Lune campaign at dusk",
      },
      {
        no: "03",
        title: "Built to survive a crop",
        body: "A fragrance launch lives at 1080×1350 and on a 6-sheet, and most identities only survive one of the two. We resolved the wordmark, the bottle lockup and the campaign crop together, so the story reads at arm's length in a feed and at forty feet on the Périphérique.",
        image: IMAGES.hero2,
        alt: "The Maison Lune identity applied across formats",
      },
    ],
    gallery: [
      {
        src: IMAGES.project1,
        alt: "Maison Lune campaign key visual",
        caption: "Key visual — shot on the ninth evening, the only one without cloud",
      },
      {
        src: IMAGES.panel3,
        alt: "Maison Lune press kit and print collateral",
        caption: "Press kit and stockist collateral",
      },
      {
        src: IMAGES.hero2,
        alt: "Maison Lune campaign portrait",
        caption: "Campaign portrait — the dusk palette, ungraded",
      },
      {
        src: IMAGES.panel1,
        alt: "Maison Lune colour and type studies",
        caption: "Colour and type studies from week two",
      },
    ],
    results: [
      { to: 2, suffix: "×", label: "Pre-orders in launch week" },
      { to: 9, suffix: "", label: "Evenings to shoot the campaign" },
      { to: 11, suffix: " wks", label: "Brief to launch" },
    ],
    quote: {
      text: "Atelier Nord gave our house an identity that feels inevitable — like it had always existed. The launch campaign doubled our pre-orders.",
      name: "Marenza Vos",
      role: "Founder, Maison Lune",
    },
  },
  {
    slug: "bloom-beauty",
    name: "Bloom Beauty",
    tag: "Identity",
    year: "2025",
    location: "New York, NY",
    summary:
      "One lipstick became a forty-piece range in eighteen months. We rebuilt the identity as a system that could take the weight — and lifted qualified enquiries 140%.",
    hero: IMAGES.project2,
    heroAlt: "The Bloom Beauty identity system",
    meta: [
      { label: "Client", value: "Bloom Beauty" },
      { label: "Sector", value: "Colour cosmetics" },
      { label: "Year", value: "2025" },
      { label: "Scope", value: "Identity, packaging system, art direction" },
    ],
    brief: {
      title: "An identity built for one product, carrying forty",
      body: [
        "Bloom launched with a single lipstick and an identity that suited it perfectly — a hand-drawn wordmark, one pink, one photographer. Eighteen months later there were forty SKUs across four categories, and every one of them was a negotiation. Nothing scaled, so everything was decided twice.",
        "The brand was not broken in the way brands are usually broken. It was well liked and completely unable to grow. Our job was to keep what customers already recognised and put a structure underneath it that could absorb a launch a month without a meeting.",
      ],
    },
    approach: [
      {
        no: "01",
        title: "We kept the wordmark and rebuilt everything under it",
        body: "The hand-drawn mark had real equity — customers could draw it from memory. So it stayed, redrawn for small sizes and nothing else. Every other decision was reopened: the pink became a family, the single photographer became a direction anyone could shoot to.",
        image: IMAGES.feature1,
        alt: "Bloom Beauty wordmark and palette system",
      },
      {
        no: "02",
        title: "Colour that names itself",
        body: "Forty products need forty decisions or one rule. We built a palette logic where a shade's position in the range determines its packaging colour, so a new launch has a right answer before anyone opens a file. The launch that used to take a week of back-and-forth now takes an afternoon.",
        image: IMAGES.panel2,
        alt: "The Bloom Beauty packaging colour system",
      },
      {
        no: "03",
        title: "A system the team could actually run",
        body: "We handed over the rules, not just the artwork — templates, a shot list logic, and the two-page document that settles arguments. Bloom's in-house team has launched every product since without us, which is the point.",
        image: IMAGES.work6,
        alt: "Bloom Beauty packaging across the range",
      },
    ],
    gallery: [
      {
        src: IMAGES.project2,
        alt: "Bloom Beauty identity key visual",
        caption: "The redrawn wordmark on the relaunch campaign",
      },
      {
        src: IMAGES.feature1,
        alt: "Bloom Beauty colour studies",
        caption: "Palette family — one rule, forty answers",
      },
      {
        src: IMAGES.work6,
        alt: "Bloom Beauty packaging range",
        caption: "Packaging across four categories",
      },
      {
        src: IMAGES.hero3,
        alt: "Bloom Beauty campaign portrait",
        caption: "Art direction the in-house team can shoot to",
      },
    ],
    results: [
      { to: 140, suffix: "%", label: "Lift in qualified enquiries" },
      { to: 40, suffix: "", label: "SKUs on one system" },
      { to: 4, suffix: "", label: "Categories, one rule set" },
    ],
    quote: {
      text: "The identity system scaled from a single lipstick to a forty-piece launch without ever looking stretched.",
      name: "Priya Natarajan",
      role: "Head of Brand, Bloom Beauty",
    },
  },
];

/** The write-up for a project name, if one exists yet. */
export function caseStudyByName(name: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.name === name);
}

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** The next study in the list, wrapping — powers the footer link. */
export function nextCaseStudy(slug: string): CaseStudy {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}
