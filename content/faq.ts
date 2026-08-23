export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "product" | "fabricator" | "ordering" | "technical";
}

export const faqs: FaqItem[] = [
  {
    id: "what-is-upvc",
    category: "general",
    question: "What is uPVC and how is it different from regular PVC?",
    answer:
      "uPVC stands for Unplasticised Polyvinyl Chloride. Unlike flexible PVC (which contains plasticisers), uPVC is rigid, dimensionally stable, and engineered for structural applications. In windows and doors, uPVC profiles are extruded into precise cross-sections, reinforced with galvanised steel, and welded to form the frame. Greentech uses a lead-free uPVC compound drawing on DIMEX GmbH (Germany) formulation expertise.",
  },
  {
    id: "why-upvc-over-wood-aluminium",
    category: "general",
    question: "Why choose uPVC windows over wood, aluminium, or MS grilles?",
    answer:
      "uPVC doesn't rust, rot, warp, or require repainting — ever. Wood needs annual painting; MS grilles rust through within 3–5 years in humid Karnataka conditions. Aluminium conducts heat, worsening thermal comfort. uPVC profiles offer genuine multi-chamber thermal insulation, acoustic damping, and are completely waterproof. At a comparable or lower total life-cycle cost, uPVC is the most maintenance-free window material available in India.",
  },
  {
    id: "what-is-authorised-dealer",
    category: "general",
    question: "What does 'Authorised Greentech Dealer' mean?",
    answer:
      "Sindhole Polymers is formally authorised by Greentech uPVC India Pvt. Ltd. to stock and supply their ISO 9001:2015 certified profile systems. This means you receive genuine Greentech profiles — not substitutes — with full certifications, correct tolerances, and the backing of Greentech's technical support. Buying from an authorised source also protects you when specifying profiles in project documentation.",
  },
  {
    id: "chambers",
    category: "technical",
    question: "What does '5-chamber profile' mean and why does it matter?",
    answer:
      "A multi-chamber profile has several sealed air pockets (chambers) running its length. Each chamber reduces heat transfer (thermal resistance improves with chamber count) and stiffens the profile. Greentech's 5-chamber design, combined with the galvanised steel reinforcement slot and twin TPE gaskets, delivers Class B EN 12068 weather sealing — resisting monsoon-driven rain, reducing air infiltration, and noticeably cutting outside noise.",
  },
  {
    id: "casement-vs-sliding",
    category: "technical",
    question: "Should I use casement or sliding windows for my project?",
    answer:
      "Casement windows (52mm or 60mm series) open on hinges — they offer a tighter weather seal and better energy performance, and suit rooms where you want maximum daylight and a clean aesthetic. The 60mm series adds rigidity for larger openings or door applications. Sliding windows (80mm series) are better for large openings where a push-out window would interfere with space, and are the standard choice for apartments and balconies.",
  },
  {
    id: "minimum-order",
    category: "ordering",
    question: "Is there a minimum order for profile supply?",
    answer:
      "For fabricators and contractors, we stock all three series and can supply from small pilot orders. For project-scale volumes (typically 50+ window sets), we recommend confirming availability in advance and we will manage logistics from our Bidar showroom. Contact us for a project-specific quote.",
  },
  {
    id: "delivery",
    category: "ordering",
    question: "Do you deliver outside Bidar?",
    answer:
      "We supply across North Karnataka — Bidar is our base, and we regularly supply to Kalaburagi (Gulbarga), Basavakalyan, Bhalki, Humnabad, and surrounding areas. For projects beyond this, contact us to discuss logistics.",
  },
  {
    id: "fabrication-support",
    category: "fabricator",
    question: "What technical support do you provide for fabricators?",
    answer:
      "We provide Greentech's fabrication guides, section drawings, welding specifications, and hardware compatibility notes for all profile systems we stock. If you run into a fit, weld, or glazing issue, we'll help troubleshoot. Greentech also provides periodic fabricator training — we'll let registered partners know when these are scheduled.",
  },
  {
    id: "warranty",
    category: "general",
    question: "What warranty applies to Greentech profiles?",
    answer:
      "Greentech uPVC India Pvt. Ltd. provides a product warranty on their profile systems (exact terms to be confirmed and updated here). As an authorised dealer, Sindhole Polymers ensures you receive genuine warranted products. Ask us for the current warranty documentation when placing your order.",
  },
  {
    id: "colours-available",
    category: "product",
    question: "What colours and finishes are available?",
    answer:
      "Greentech profiles are available in Classic White, Jet Black, Golden Oak, Dark Walnut, and Rosewood woodgrain foils — all standard across the casement and sliding series. Dual-colour (different interior and exterior finishes) is available on selected series. Contact us to confirm current stock and lead times for specific finishes.",
  },
];

export const faqCategories = [
  { id: "all" as const, label: "All" },
  { id: "general" as const, label: "General" },
  { id: "technical" as const, label: "Technical" },
  { id: "product" as const, label: "Products" },
  { id: "ordering" as const, label: "Ordering" },
  { id: "fabricator" as const, label: "For Fabricators" },
] as const;

export type FaqCategory = (typeof faqCategories)[number]["id"];
