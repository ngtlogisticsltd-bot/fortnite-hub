export interface ChatMessage {
  id: string;
  nickname: string;
  message: string;
  topic: string;
  status: 'pending' | 'approved' | 'blocked';
  moderationNote?: string;
  timestamp: string;
}

// In-memory fallback for chat
let chatQueue: ChatMessage[] = [
  {
    id: 'm1',
    nickname: 'PeelyFan',
    message: 'Did anyone see the new mythic at Mount Olympus?',
    topic: 'Gameplay',
    status: 'approved',
    timestamp: new Date().toISOString()
  },
  {
    id: 'm2',
    nickname: 'ItemShopWatcher',
    message: 'Marvel skins might return next week according to leaks!',
    topic: 'Shop',
    status: 'pending',
    timestamp: new Date().toISOString()
  }
];

export function getChatMessages(status?: 'approved' | 'pending' | 'blocked'): ChatMessage[] {
  if (status) return chatQueue.filter(m => m.status === status);
  return chatQueue;
}

export function addChatMessage(msg: Omit<ChatMessage, 'id' | 'status' | 'timestamp'>): ChatMessage {
  const newMsg: ChatMessage = {
    ...msg,
    id: Math.random().toString(36).substr(2, 9),
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  chatQueue = [newMsg, ...chatQueue];
  return newMsg;
}

export function moderateMessage(id: string, status: 'approved' | 'blocked', note?: string) {
  chatQueue = chatQueue.map(m => m.id === id ? { ...m, status, moderationNote: note } : m);
}
