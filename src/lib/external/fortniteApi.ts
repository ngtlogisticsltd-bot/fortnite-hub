/**
 * Fortnite-API.com Public Wrapper
 * Used for fetching legal, public game data (News, Shop, Cosmetics).
 */

const BASE_URL = 'https://fortnite-api.com/v2';

export async function getFortniteNews() {
  try {
    const res = await fetch(`${BASE_URL}/news/br`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error("Failed to fetch Fortnite News", err);
    return null;
  }
}

export async function getDailyShop() {
  try {
    const res = await fetch(`${BASE_URL}/shop/br`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error("Failed to fetch Item Shop", err);
    return null;
  }
}

export async function getCosmetics() {
  try {
    const res = await fetch(`${BASE_URL}/cosmetics/br/new`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error("Failed to fetch New Cosmetics", err);
    return null;
  }
}
