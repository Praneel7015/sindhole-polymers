export interface ResourceItem {
  id: string;
  category: "brochures" | "datasheets" | "guides" | "warranty";
  title: string;
  desc: string;
  size: string;
  /** Google Drive link or direct URL — empty string = not yet available */
  url: string;
  credit?: string;
}

export const resources: ResourceItem[] = [
  {
    id: "greentech-brochure",
    category: "brochures",
    title: "Greentech uPVC Systems — Product Brochure",
    desc: "Overview of all Greentech profile systems, finishes, and performance credentials.",
    size: "PDF · ~4 MB",
    url: "",
    credit: "Greentech uPVC India Pvt. Ltd.",
  },
  {
    id: "52-casement-datasheet",
    category: "datasheets",
    title: "52mm Casement Series — Technical Datasheet",
    desc: "Section codes, dimensions, chambers, gasket spec, and glass size range.",
    size: "PDF · ~1 MB",
    url: "",
  },
  {
    id: "60-casement-datasheet",
    category: "datasheets",
    title: "60mm Casement Series — Technical Datasheet",
    desc: "Full section library for CF-60-GT, CSO/CSI-60-GT, CFTM-60-GT, and glazing beads.",
    size: "PDF · ~1.2 MB",
    url: "",
  },
  {
    id: "80-sliding-datasheet",
    category: "datasheets",
    title: "80mm Sliding Series — Technical Datasheet",
    desc: "2-track and 2.5-track outer frames, shutter frames, interlocks, mesh provision.",
    size: "PDF · ~1.1 MB",
    url: "",
  },
  {
    id: "fabrication-guide",
    category: "guides",
    title: "Greentech Fabrication Guide",
    desc: "Step-by-step cutting, reinforcement, welding, and glazing procedure for Greentech profiles.",
    size: "PDF · ~8 MB",
    url: "",
    credit: "Greentech uPVC India Pvt. Ltd.",
  },
  {
    id: "warranty-statement",
    category: "warranty",
    title: "Greentech Warranty & Quality Statement",
    desc: "ISO 9001:2015 certification and warranty terms for Greentech profile systems.",
    size: "PDF · ~500 KB",
    url: "",
    credit: "Greentech uPVC India Pvt. Ltd.",
  },
];

export const resourceCategories = [
  { id: "all" as const, label: "All" },
  { id: "brochures" as const, label: "Brochures" },
  { id: "datasheets" as const, label: "Datasheets" },
  { id: "guides" as const, label: "Fabrication Guides" },
  { id: "warranty" as const, label: "Warranty & Quality" },
] as const;
