import { IMAGES } from "./images";

export const SERVICES = [
  {
    no: "01",
    title: "Brand Identity",
    body: "Naming, visual systems and art direction that hold together everywhere your brand shows up.",
  },
  {
    no: "02",
    title: "Campaign & Art Direction",
    body: "Concept, casting and set through to final retouch — campaigns with a point of view.",
  },
  {
    no: "03",
    title: "Editorial & Print",
    body: "Lookbooks, packaging and print built with the same care as the collection inside.",
  },
  {
    no: "04",
    title: "Digital & Motion",
    body: "Sites, launches and motion that carry the identity into every feed and screen.",
  },
];

export const PROJECTS = [
  {
    no: "01",
    title: "Maison Lune",
    location: "Paris, FR",
    image: IMAGES.project1,
    tag: "Campaign",
  },
  {
    no: "02",
    title: "Bloom Beauty",
    location: "New York, NY",
    image: IMAGES.project2,
    tag: "Identity",
  },
  {
    no: "03",
    title: "Solstice Swim",
    location: "Lisbon, PT",
    image: IMAGES.project3,
    tag: "Editorial",
  },
  {
    no: "04",
    title: "Atelier Rue",
    location: "London, UK",
    image: IMAGES.project4,
    tag: "Identity",
  },
];

export const FEATURES = [
  {
    no: "01",
    title: "Colour as a language",
    body: "We build palettes the way a stylist builds a look — with contrast, restraint and one note that makes the whole thing sing.",
    image: IMAGES.feature1,
    bullets: ["Palette systems", "Colour direction", "Print & screen matching"],
  },
  {
    no: "02",
    title: "Casting, set and light",
    body: "Campaigns are made on set. We art-direct casting, styling and light so every frame belongs to the brand.",
    image: IMAGES.feature2,
    bullets: ["Casting & styling", "Set design", "On-set direction"],
  },
  {
    no: "03",
    title: "One studio, end to end",
    body: "The team that sketches the first mood board is the team at the final retouch. Nothing is outsourced, nothing is lost in translation.",
    image: IMAGES.feature3,
    bullets: ["In-house production", "Single point of contact", "Concept to launch"],
  },
];

export const PRODUCTS = [
  { name: "Maison Lune", category: "Campaign", image: IMAGES.project1, spec: "2026" },
  { name: "Bloom Beauty", category: "Identity", image: IMAGES.project2, spec: "2025" },
  { name: "Solstice Swim", category: "Editorial", image: IMAGES.project3, spec: "2025" },
  { name: "Atelier Rue", category: "Identity", image: IMAGES.project4, spec: "2024" },
  { name: "Velvet Hour", category: "Campaign", image: IMAGES.work5, spec: "2024" },
  { name: "Petal & Co", category: "Packaging", image: IMAGES.work6, spec: "2025" },
  { name: "Nova Eyewear", category: "Digital", image: IMAGES.work7, spec: "2024" },
  { name: "Golden Hour", category: "Packaging", image: IMAGES.work8, spec: "2023" },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Identity",
  "Campaign",
  "Editorial",
  "Packaging",
  "Digital",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Atelier Nord gave our house an identity that feels inevitable — like it had always existed. The launch campaign doubled our pre-orders.",
    name: "Marenza Vos",
    role: "Founder, Maison Lune",
    avatar: IMAGES.avatar1,
  },
  {
    quote:
      "They balanced our budget and our ambition without ever compromising the work. A true partner from the first deck to launch day.",
    name: "Daniel Okafor",
    role: "CMO, Bloom Beauty",
    avatar: IMAGES.avatar2,
  },
  {
    quote:
      "The lookbook photographs beautifully, but the whole system is even better in use — every touchpoint feels considered.",
    name: "Sofia Renner",
    role: "Creative Director, Solstice Swim",
    avatar: IMAGES.avatar3,
  },
  {
    quote:
      "From the first mood board to the final frame the craft was extraordinary. A studio that genuinely listens, then quietly raises the bar.",
    name: "Aiko Tanaka",
    role: "Founder, Atelier Rue",
    avatar: IMAGES.avatar4,
  },
];

// ---------------------------------------------------------------------------
// Voices page — more quotes, outcomes, press and the client index.
// ---------------------------------------------------------------------------

export const VOICES = [
  {
    quote: "The identity system scaled from a single lipstick to a forty-piece launch without ever looking stretched.",
    name: "Priya Natarajan",
    role: "Head of Brand",
    brand: "Bloom Beauty",
  },
  {
    quote: "They understood that swimwear sells a feeling of July. Every frame of the lookbook does exactly that.",
    name: "Inès Duarte",
    role: "Founder",
    brand: "Solstice Swim",
  },
  {
    quote: "Our packaging went from shelf-invisible to the thing people photograph first.",
    name: "Tom Ashworth",
    role: "Co-founder",
    brand: "Petal & Co",
  },
  {
    quote: "Three agencies pitched us decks. Atelier Nord pitched us a mood board and a casting list — and were right.",
    name: "Lucía Ferré",
    role: "CMO",
    brand: "Velvet Hour",
  },
  {
    quote: "The launch film paid for itself in pre-orders before it had finished its first week.",
    name: "Marenza Vos",
    role: "Founder",
    brand: "Maison Lune",
  },
  {
    quote: "Calm to work with, ruthless about the details. The best kind of studio.",
    name: "Jonah Reyes",
    role: "Creative Lead",
    brand: "Nova Eyewear",
  },
];

export const RESULTS = [
  { to: 2, suffix: "×", label: "Pre-orders in launch week", client: "Maison Lune" },
  { to: 140, suffix: "%", label: "Lift in qualified enquiries", client: "Bloom Beauty" },
  { to: 34, suffix: "%", label: "Higher average order value", client: "Solstice Swim" },
  { to: 80, suffix: "+", label: "Stockists in the first year", client: "Petal & Co" },
];

export const PRESS = [
  {
    outlet: "Vogue",
    quote: "A studio that treats a lipstick launch with the seriousness of a couture show.",
    meta: "Beauty · Spring 2026",
  },
  {
    outlet: "Dazed",
    quote: "Their campaigns look like nothing else on the feed — and then everything on the feed starts to look like them.",
    meta: "Fashion · February 2026",
  },
  {
    outlet: "Kinfolk",
    quote: "Quietly one of the most consistent eyes in brand design right now.",
    meta: "Studio visit · 2025",
  },
];

export const CLIENTS = [
  { name: "Maison Lune", category: "Campaign", year: "2026" },
  { name: "Bloom Beauty", category: "Identity", year: "2025" },
  { name: "Solstice Swim", category: "Editorial", year: "2025" },
  { name: "Petal & Co", category: "Packaging", year: "2025" },
  { name: "Atelier Rue", category: "Identity", year: "2024" },
  { name: "Velvet Hour", category: "Campaign", year: "2024" },
  { name: "Nova Eyewear", category: "Digital", year: "2024" },
  { name: "Golden Hour", category: "Packaging", year: "2023" },
  { name: "Studio Ferré", category: "Identity", year: "2023" },
  { name: "Marigold Skin", category: "Campaign", year: "2023" },
  { name: "Linen & Loom", category: "Editorial", year: "2022" },
  { name: "Halo Hair", category: "Digital", year: "2022" },
];
