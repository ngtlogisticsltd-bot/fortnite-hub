// Fortnite API Client

const BASE_URL = 'https://fortnite-api.com/v2';

export interface APIResponse<T> {
  status: number;
  data: T;
}

export async function safeFetchJson<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour by default to respect rate limits
      ...options,
    });
    
    if (!res.ok) {
      console.error(`Fortnite API Error: ${res.status} ${res.statusText} for ${endpoint}`);
      return null;
    }

    const json = await res.json() as APIResponse<T>;
    return json.data;
  } catch (error) {
    console.error(`Fortnite API Network Error for ${endpoint}:`, error);
    return null;
  }
}

// ---------------------------------------------------------
// Item Shop
// ---------------------------------------------------------

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: { value: string; displayValue: string };
  rarity: { value: string; displayValue: string; backendValue: string };
  images: { icon: string; featured: string; background: string };
  price: number;
}

export async function getItemShop(): Promise<ShopItem[]> {
  const data = await safeFetchJson<any>('/shop');
  if (!data || !data.daily || !data.daily.entries) return [];

  // Flatten the daily entries into a simpler array of items
  const items: ShopItem[] = [];
  
  for (const entry of data.daily.entries) {
    if (entry.items && entry.items.length > 0) {
      const item = entry.items[0]; // Take the primary item from the bundle/entry
      items.push({
        id: item.id,
        name: item.name,
        description: item.description,
        type: item.type,
        rarity: item.rarity,
        images: item.images,
        price: entry.finalPrice || entry.regularPrice || 0
      });
    }
  }

  return items;
}

// ---------------------------------------------------------
// News
// ---------------------------------------------------------

export interface NewsItem {
  id: string;
  title: string;
  tabTitle: string;
  body: string;
  image: string;
  adspace: string;
}

export async function getNews(): Promise<NewsItem[]> {
  const data = await safeFetchJson<any>('/news/br');
  if (!data || !data.motds) return [];
  return data.motds;
}

// ---------------------------------------------------------
// Cosmetics
// ---------------------------------------------------------

export interface Cosmetic {
  id: string;
  name: string;
  description: string;
  type: { displayValue: string };
  rarity: { displayValue: string; backendValue: string };
  images: { icon: string; featured: string | null };
}

export async function getCosmetics(): Promise<Cosmetic[]> {
  // We fetch a limited list, e.g., the new cosmetics to prevent massive payload
  const data = await safeFetchJson<{ items: Cosmetic[] }>('/cosmetics/br/new');
  if (!data || !data.items) return [];
  return data.items;
}

export async function getFeaturedCosmetics(limit: number = 100): Promise<Cosmetic[]> {
  try {
    const res = await fetch('https://fortnite-api.com/v2/cosmetics/br/new', { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const items = json.data?.items;
    if (!items || !Array.isArray(items)) return [];
    return items.sort(() => 0.5 - Math.random()).slice(0, limit);
  } catch (error) {
    return [];
  }
}
