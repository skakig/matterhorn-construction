export const site = {
  name: "Matterhorn Construction",
  legal: "Matterhorn Construction, LLC",
  tagline: "Built for the high country.",
  location: "Pagosa Springs, Colorado",
  region: "San Juan Mountains",
  peak: "Pagosa Peak",
  peakElevation: "12,658 ft",
  coordinates: "37.44395°N, 107.06659°W",
  email: "matterhornconstructionllc@gmail.com",
  phoneLabel: "970-903-0122",
  phoneHref: "tel:+19709030122",
  owner: "Jody Ellis",
  instagram: "https://instagram.com",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: "12,658", unit: "ft", label: "Pagosa Peak" },
  { value: "1,002+", unit: "ft", label: "World’s deepest hot spring" },
  { value: "4th", unit: "generation", label: "Master Builder" },
  { value: "40+", unit: "years", label: "of professional construction experience" },
];

export const phases = [
  {
    id: "concept",
    num: "01",
    title: "Concept",
    kicker: "The idea",
    copy: "The lot is the brief. Pagosa Peak on the horizon, a dirt pad, the first machine. Before timber goes up, this is the idea standing in the weather.",
    image: "/images/phase-concept.jpg",
    video: "/videos/phase-concept.mp4",
  },
  {
    id: "foundation",
    num: "02",
    title: "Foundation",
    kicker: "Groundwork",
    copy: "The machine hits the slope. Cut, fill, stem walls, and footings engineered for freeze-thaw and mountain drainage.",
    image: "/images/phase-foundation.jpg",
    video: "/videos/phase-foundation.mp4",
  },
  {
    id: "frame",
    num: "03",
    title: "Frame",
    kicker: "Structure",
    copy: "Heavy logs and steel. Shear walls lock the roof, and a mountain ranch finds its bones.",
    image: "/images/phase-frame.jpg",
    video: "/videos/phase-frame.mp4",
  },
  {
    id: "change",
    num: "04",
    title: "Change request",
    kicker: "The dormer",
    copy: "In this concept, an additional dormer brings more light into the loft. The design evolves as the possibilities become clearer.",
    image: "/images/phase-change.jpg",
    video: "/videos/phase-change.mp4",
  },
  {
    id: "finish",
    num: "05",
    title: "Realization",
    kicker: "The finished concept",
    copy: "Lights on, landscaping in place, and a mountain home imagined in full. From concept to realization, Matterhorn Construction is with you every step of the way—right up to the moment we hand you the keys.",
    image: "/images/phase-finish.jpg",
    video: "/videos/lodge-entry.mp4",
  },
] as const;

export const services = [
  {
    num: "01",
    title: "Custom homes",
    copy: "New residences designed for the lot — timber and stone, with steel and glass, from first stake to final walkthrough.",
  },
  {
    num: "02",
    title: "Design-build",
    copy: "One team from schematic through punch list. Fewer handoffs, tighter budgets, a house that still looks like the drawing.",
  },
  {
    num: "03",
    title: "Remodel & addition",
    copy: "Opening a 1980s ranch to the peaks, adding a primary wing, rebuilding a deck that has seen too many winters.",
  },
  {
    num: "04",
    title: "Groundwork",
    copy: "Steep lots and long drives. Retaining walls and snow-country flashing. The work you do before the pretty pictures.",
  },
] as const;

export type FilmShot = {
  id: string;
  src: string;
  video?: string;
  title: string;
  caption: string;
  slug: string;
};

export const films: FilmShot[] = [
  {
    id: "approach",
    src: "/images/hero-lodge.jpg",
    video: "/videos/hero-film.mp4",
    title: "The approach",
    caption: "Concept to realization",
    slug: "six-pines-ranch",
  },
  {
    id: "arrival",
    src: "/images/lodge-drive.jpg",
    video: "/videos/lodge-drive.mp4",
    title: "Arrival",
    caption: "Porte-cochere",
    slug: "six-pines-ranch",
  },
  {
    id: "lawn",
    src: "/images/lodge-lawn.jpg",
    video: "/videos/lodge-lawn.mp4",
    title: "The lawn",
    caption: "Back of the garage",
    slug: "six-pines-ranch",
  },
  {
    id: "garage",
    src: "/images/lodge-garage.jpg",
    video: "/videos/lodge-garage.mp4",
    title: "The garage",
    caption: "Heavy timber, steel doors",
    slug: "six-pines-ranch",
  },
  {
    id: "rear",
    src: "/images/lodge-stream.jpg",
    video: "/videos/lodge-stream.mp4",
    title: "The finish",
    caption: "Landscaped ranch",
    slug: "six-pines-ranch",
  },
  {
    id: "stream",
    src: "/images/lodge-stream.jpg",
    video: "/videos/lodge-stream.mp4",
    title: "The stream",
    caption: "Built, not found",
    slug: "six-pines-ranch",
  },
  {
    id: "firepit",
    src: "/images/lodge-firepit.jpg",
    video: "/videos/lodge-firepit.mp4",
    title: "Fire pit",
    caption: "Swing and stone",
    slug: "six-pines-ranch",
  },
  {
    id: "patio",
    src: "/images/lodge-courtyard.jpg",
    video: "/videos/lodge-courtyard.mp4",
    title: "Under the decks",
    caption: "The hangout",
    slug: "six-pines-ranch",
  },
  {
    id: "pool",
    src: "/images/lodge-pool.jpg",
    video: "/videos/lodge-pool.mp4",
    title: "The water",
    caption: "Courtyard pool",
    slug: "six-pines-ranch",
  },
  {
    id: "courtyard",
    src: "/images/lodge-courtyard.jpg",
    video: "/videos/lodge-courtyard.mp4",
    title: "Courtyard",
    caption: "Wings and stone",
    slug: "six-pines-ranch",
  },
  {
    id: "peak",
    src: "/images/pagosa-peak.jpg",
    video: "/videos/pagosa-peak.mp4",
    title: "Pagosa Peak",
    caption: "12,658 ft",
    slug: "six-pines-ranch",
  },
];

export const lodgeShots = films.filter((f) =>
  ["arrival", "lawn", "rear", "patio"].includes(f.id),
);

export const approachFilm = films[0]!;

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  type: string;
  size: string;
  image: string;
  video?: string;
  gallery: FilmShot[];
  excerpt: string;
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "six-pines-ranch",
    title: "Six Pines Ranch",
    location: "Pagosa Springs",
    year: "2025",
    type: "Timber ranch",
    size: "Custom",
    image: "/images/lodge-rear.jpg",
    video: "/videos/lodge-stream.mp4",
    gallery: films.filter((f) => f.id !== "approach"),
    excerpt:
      "Six Pines Ranch — a heavy-timber house under Pagosa Peak, finished with a built stream, antler work, stone, and a lawn the dog owns.",
    body: [
      "The ranch sits in Pagosa Springs with Pagosa Peak on the horizon at 37.44395°N, 107.06659°W. Massive log columns, deep metal gables, stone bases, and a porte-cochere sized for a mountain winter.",
      "The finish is the yard: a rock-lined stream we built through the lawn, antler bridge and tables, boulder walls, decks, fire pit, and water at the tree line. Built to be lived in — dogs on the grass, chairs pointed at the peak.",
    ],
  },
];

export const values = [
  {
    title: "The lot is the brief",
    copy: "Wind, solar, snow, access, and the view you actually want from the sink. We walk it before we draw it.",
  },
  {
    title: "Weather is the craft",
    copy: "Wolf Creek snow, freeze-thaw, March wind. Roofs and flashing come first so the timber and glass can last.",
  },
  {
    title: "One crew, one conversation",
    copy: "Design-build means the people who bid the steel are in the room when we talk about the glass. Fewer surprises.",
  },
];

export const projectTypes = [
  "Custom home",
  "Design-build",
  "Remodel / addition",
  "Site work",
  "Other",
] as const;

export const startTimelines = [
  "This season",
  "Spring",
  "Next year",
  "18 months or more",
  "Just exploring",
] as const;
