// ─── Product ranges — swap specs for real Greentech data when available ───────
export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductRange {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  chips: string[];
  type: "casement" | "sliding" | "tilt-turn" | "fixed";
  available: boolean;
  photo: string;
  imageCredit?: string;
}

export const products: ProductRange[] = [
  {
    id: "52-casement",
    code: "52-Casement",
    name: "52mm Casement Series",
    tagline: "Slimline frames, maximum daylight.",
    description:
      "A 52mm outer frame depth profile with 5 chambers and twin TPE gaskets. Designed for outward- and inward-opening casement windows and doors where sightlines matter. The slimline frame maximises glass area and natural light — ideal for residential projects where aesthetics are as important as performance.",
    specs: [
      { label: "Frame depth", value: "52 mm" },
      { label: "Chambers", value: "5" },
      { label: "Gasket", value: "TPE Black" },
      { label: "Class", value: "B — EN 12068" },
      { label: "Max glass", value: "30 mm" },
      { label: "Wall thickness", value: "2.2–2.5 mm" },
    ],
    chips: ["Casement", "Outward sash", "Inward sash", "T-Mullion", "Z-Mullion"],
    type: "casement",
    available: true,
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
    imageCredit: "Greentech uPVC India Pvt. Ltd.",
  },
  {
    id: "60-casement",
    code: "60-Casement",
    name: "60mm Casement Series",
    tagline: "High-performance profiles for demanding openings.",
    description:
      "60mm frame depth for increased structural rigidity and expanded glazing options up to 30mm. Five chambers with twin TPE gaskets; supports casement doors as well as windows — and a louver sash option for ventilation. The benchmark choice for quality residential and light commercial applications.",
    specs: [
      { label: "Frame depth", value: "60 mm" },
      { label: "Chambers", value: "5" },
      { label: "Gasket", value: "TPE Black" },
      { label: "Class", value: "B — EN 12068" },
      { label: "Max glass", value: "30 mm" },
      { label: "Wall thickness", value: "2.2–2.5 mm" },
    ],
    chips: ["Casement", "Window sash", "Door sash", "Louver bead", "Glazing bead"],
    type: "casement",
    available: true,
    photo: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80&auto=format&fit=crop",
    imageCredit: "Greentech uPVC India Pvt. Ltd.",
  },
  {
    id: "80-sliding",
    code: "80-Sliding",
    name: "80mm Sliding Series",
    tagline: "Smooth glide. Tight seal. Wide spans.",
    description:
      "An 80mm 2- and 2.5-track sliding system engineered for large openings. Five chambers, interlocking shutters, and mesh frame provision for insect screens. The system of choice for apartments, villas, and commercial fit-outs requiring wide, weather-tight openings with minimal maintenance.",
    specs: [
      { label: "Frame depth", value: "80 mm" },
      { label: "Track options", value: "2-track · 2.5-track" },
      { label: "Chambers", value: "5" },
      { label: "Gasket", value: "TPE Black" },
      { label: "Class", value: "B — EN 12068" },
    ],
    chips: ["Sliding", "Interlock", "Mesh frame", "Shutter mullion", "Wide span"],
    type: "sliding",
    available: true,
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80&auto=format&fit=crop",
    imageCredit: "Greentech uPVC India Pvt. Ltd.",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
