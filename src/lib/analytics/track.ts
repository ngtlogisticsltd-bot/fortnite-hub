export async function trackEvent(type: 'ad_click' | 'affiliate_click' | 'page_view', label: string) {
  // Check if we are on the client side
  if (typeof window !== 'undefined') {
    console.log(`[MOCK ANALYTICS] Event: ${type} | Label: ${label}`);
    
    // Attempt to hit the tracking API if needed
    try {
      fetch('/api/tracking/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, label, timestamp: new Date().toISOString() })
      }).catch(() => {}); // fire and forget
    } catch (e) {}
  }
}
