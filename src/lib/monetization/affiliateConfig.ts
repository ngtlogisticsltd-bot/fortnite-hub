export const affiliateConfig = {
  disclaimer: "FortHub may earn a commission on purchases made through these links.",
  merchants: [
    { id: "epic-games-creator-code", name: "Epic Games Support-A-Creator", code: process.env.NEXT_PUBLIC_CREATOR_CODE || "PLACEHOLDER", status: "mock" },
    { id: "amazon-gaming", name: "Amazon Gaming Gear", status: "mock" }
  ]
};
