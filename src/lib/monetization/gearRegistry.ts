export type GearItem = {
  id: string;
  title: string;
  summary: string;
  status: "LIVE" | "NEEDS_REVIEW" | "NEEDS_AFFILIATE";
  category: "controller" | "mouse" | "keyboard" | "headset" | "monitor";
  affiliateUrl?: string;
  imageUrl?: string;
};

export const gearItems: GearItem[] = [
  {
    id: "gamesir-g7-se",
    title: "GameSir G7 SE (Budget King)",
    summary: "The best budget controller for Fortnite. Hall Effect sticks prevent stick drift, which is critical for high-sens linear players.",
    status: "NEEDS_AFFILIATE",
    category: "controller",
    imageUrl: "https://m.media-amazon.com/images/I/61kM5A1qF+L._AC_SL1500_.jpg"
  },
  {
    id: "logitech-g-pro-superlight",
    title: "Logitech G Pro X Superlight 2",
    summary: "The industry standard for professional Fortnite players. Ultra-lightweight for fast flick shots and consistent aim tracking.",
    status: "NEEDS_REVIEW",
    category: "mouse",
    imageUrl: "https://m.media-amazon.com/images/I/51fG9GvNlFL._AC_SL1500_.jpg"
  },
  {
    id: "wooting-60he",
    title: "Wooting 60HE+",
    summary: "The fastest keyboard for editing. Rapid Trigger technology allows for near-instant resets and movement precision.",
    status: "NEEDS_REVIEW",
    category: "keyboard",
    imageUrl: "https://wooting.io/assets/60he-top-view.png"
  }
];
