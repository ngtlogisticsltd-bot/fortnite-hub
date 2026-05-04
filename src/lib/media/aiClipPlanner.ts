export interface AiClipPlan {
  title: string;
  hook: string;
  script: string;
  sceneList: string[];
  voiceover: string;
  thumbnailPrompt: string;
  caption: string;
  hashtags: string[];
  legalChecklist: string[];
  publishChecklist: string[];
}

const defaultPlans: Record<string, AiClipPlan> = {
  'fortnite item shop today': {
    title: 'NEW Item Shop Today! Best Skins & Must-Buy Picks',
    hook: 'The item shop just rotated — here are the skins you NEED to see before they\'re gone.',
    script: 'Welcome back to FortHub. The item shop has just rotated and today\'s lineup is stacked. Let me break down the top picks, the returning favorites, and what you should skip. First up — [Skin Name] is back after [X] days...',
    sceneList: [
      'Opening: FortHub logo animation (2s)',
      'Item shop overview grid with prices (5s)',
      'Individual skin spotlight with rarity badge (4s each, x3)',
      'Community poll overlay: "Would you buy?" (3s)',
      'Closing: FortHub subscribe CTA + creator code (3s)'
    ],
    voiceover: 'Upbeat, informative tone. Speak clearly. No impersonation of Epic Games employees.',
    thumbnailPrompt: 'Bold text "NEW SHOP" with a glowing item shop kiosk icon, dark purple/blue gradient background, golden sparkle effects, clean modern gaming font.',
    caption: 'The item shop just reset! Here are today\'s must-buy skins and which ones to skip. Full breakdown on FortHub.',
    hashtags: ['#Fortnite', '#ItemShop', '#FortniteShop', '#FortHub', '#FortniteToday'],
    legalChecklist: [
      'No copyrighted Fortnite gameplay footage used',
      'No official Epic Games trailer footage used',
      'All visuals are original or royalty-free',
      'Creator code disclosed if applicable',
      'FortHub labeled as unofficial fan site'
    ],
    publishChecklist: [
      'Script reviewed by owner',
      'Thumbnail approved',
      'Caption and hashtags finalized',
      'Legal checklist passed',
      'Uploaded to approved platform account'
    ]
  },
  'best xp maps this week': {
    title: 'TOP 5 XP Maps This Week — Fast Level Up!',
    hook: 'Want to hit level 200 fast? These are the best XP maps right now.',
    script: 'If you\'re grinding for battle pass rewards, these five XP maps are the fastest way to level up this week. Number five — [Map Name] with code [CODE]...',
    sceneList: [
      'Opening: FortHub logo + "XP MAPS" title card (2s)',
      'Map #5: Name, code, XP/hour estimate (5s)',
      'Map #4: Name, code, XP/hour estimate (5s)',
      'Map #3: Name, code, XP/hour estimate (5s)',
      'Map #2: Name, code, XP/hour estimate (5s)',
      'Map #1: Name, code, XP/hour estimate (5s)',
      'Closing: "More maps on FortHub" + subscribe CTA (3s)'
    ],
    voiceover: 'Energetic, helpful tone. Spell out map codes clearly.',
    thumbnailPrompt: 'Text "TOP 5 XP MAPS" with a glowing XP bar icon, bright green and gold accents, dark background, bold gaming typography.',
    caption: 'Level up FAST with these 5 XP maps! Codes included. Updated weekly on FortHub.',
    hashtags: ['#Fortnite', '#XPMaps', '#FortniteMaps', '#LevelUp', '#FortHub'],
    legalChecklist: [
      'No copyrighted footage used',
      'Map codes verified as public/community maps',
      'No creator content used without permission',
      'FortHub labeled as unofficial'
    ],
    publishChecklist: [
      'Map codes verified and tested',
      'Script reviewed',
      'Thumbnail approved',
      'Published to approved platform'
    ]
  }
};

export function generateAiClipPlan(topic: string): AiClipPlan {
  const normalized = topic.toLowerCase().trim();

  // Check for exact or close matches
  for (const [key, plan] of Object.entries(defaultPlans)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return plan;
    }
  }

  // Fallback: generate a generic plan structure
  return {
    title: `FortHub Original: ${topic}`,
    hook: `Here\'s everything you need to know about ${topic} right now.`,
    script: `Welcome to FortHub. Today we\'re covering ${topic}. Let\'s break it down step by step. [Add your specific talking points here]...`,
    sceneList: [
      'Opening: FortHub logo animation (2s)',
      `Topic intro: "${topic}" title card (3s)`,
      'Main content: Key points with visual aids (15s)',
      'Summary: Quick recap of main takeaways (5s)',
      'Closing: FortHub subscribe CTA + link (3s)'
    ],
    voiceover: 'Clear, informative tone. No impersonation. Original script only.',
    thumbnailPrompt: `Bold text "${topic.toUpperCase()}" with dynamic gaming-style background, neon accents, modern typography, dark base.`,
    caption: `Everything you need to know about ${topic}. Full breakdown on FortHub.`,
    hashtags: ['#Fortnite', '#FortHub', '#Gaming', '#FortniteNews'],
    legalChecklist: [
      'No copyrighted footage used',
      'All visuals are original or royalty-free',
      'No creator content used without permission',
      'FortHub labeled as unofficial fan site',
      'No Epic Games impersonation'
    ],
    publishChecklist: [
      'Script reviewed by owner',
      'Thumbnail approved',
      'Caption finalized',
      'Legal checklist passed',
      'Uploaded to approved platform'
    ]
  };
}
