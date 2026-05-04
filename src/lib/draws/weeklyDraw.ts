export type DrawMode = 'waitlist' | 'live';

export interface DrawEntry {
  id: string;
  nickname: string;
  email?: string;
  comment?: string;
  status: 'pending' | 'eligible' | 'ineligible' | 'waitlist';
  agreedRules: boolean;
  selectedWinner: boolean;
  timestamp: string;
}

let drawEntries: DrawEntry[] = [];
let currentMode: DrawMode = 'waitlist';

export function getDrawMode(): DrawMode {
  return currentMode;
}

export function setDrawMode(mode: DrawMode) {
  currentMode = mode;
}

export function getDrawEntries(): DrawEntry[] {
  return drawEntries;
}

export function addDrawEntry(entry: Omit<DrawEntry, 'id' | 'status' | 'selectedWinner' | 'timestamp'>): DrawEntry {
  const newEntry: DrawEntry = {
    ...entry,
    comment: entry.comment || '',
    id: Math.random().toString(36).substr(2, 9),
    status: currentMode === 'waitlist' ? 'waitlist' : 'pending',
    selectedWinner: false,
    timestamp: new Date().toISOString()
  };
  drawEntries = [newEntry, ...drawEntries];
  return newEntry;
}

export function updateEntryStatus(id: string, status: 'eligible' | 'ineligible' | 'waitlist') {
  drawEntries = drawEntries.map(e => e.id === id ? { ...e, status } : e);
}

export function pickWinner(): DrawEntry | null {
  if (currentMode === 'waitlist') return null;
  const eligible = drawEntries.filter(e => e.status === 'eligible');
  if (eligible.length === 0) return null;
  const winner = eligible[Math.floor(Math.random() * eligible.length)];
  drawEntries = drawEntries.map(e => ({ ...e, selectedWinner: e.id === winner.id }));
  return winner;
}
