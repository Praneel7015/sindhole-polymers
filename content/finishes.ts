export interface Finish {
  id: string;
  name: string;
  desc: string;
  hex: string;
  border: string;
  frameColor: string;
  frameStroke: string;
  isWoodgrain?: boolean;
}

export const finishes: Finish[] = [
  {
    id: "white",
    name: "Classic White",
    desc: "The timeless standard — bright, clean, suits every architectural style.",
    hex: "#F5F4F0",
    border: "#D8D6CE",
    frameColor: "#EFEFEB",
    frameStroke: "#C8C6BC",
  },
  {
    id: "black",
    name: "Jet Black",
    desc: "Architect-favourite. Bold contrast, refined lines, strong kerb appeal.",
    hex: "#2A2A25",
    border: "#1A1A14",
    frameColor: "#232320",
    frameStroke: "#111110",
  },
  {
    id: "golden-oak",
    name: "Golden Oak",
    desc: "Warm woodgrain foil — the natural look, without the natural maintenance.",
    hex: "#9E6B36",
    border: "#7A5024",
    frameColor: "#A87040",
    frameStroke: "#7A5024",
    isWoodgrain: true,
  },
  {
    id: "dark-walnut",
    name: "Dark Walnut",
    desc: "Deeper woodgrain for contemporary interiors and premium residential projects.",
    hex: "#5C3D20",
    border: "#3E2810",
    frameColor: "#5C3D20",
    frameStroke: "#3E2810",
    isWoodgrain: true,
  },
  {
    id: "rosewood",
    name: "Rosewood",
    desc: "A reddish-brown grain with warmth and depth — popular in villas and row houses.",
    hex: "#7D3C28",
    border: "#5C2A18",
    frameColor: "#7D3C28",
    frameStroke: "#5C2A18",
    isWoodgrain: true,
  },
];
