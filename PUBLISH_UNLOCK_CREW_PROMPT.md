Build FortHub Publish Unlock Crew.

Mission:
The site is technically running but content is stuck in approval/pending loops. Create a safe publishing crew that unlocks public output without fake traffic, fake revenue, fake sponsors, stolen videos, or copied content.

Rules:
- Do NOT fake item shop items.
- Do NOT fake sponsors.
- Do NOT fake revenue.
- Do NOT reupload creator clips.
- Do NOT auto-publish risky creator/news/money content.
- Auto-publish only safe system, official-source, attribution-safe, and fallback content.
- Money, sponsor, creator, and uncertain content must remain NEEDS_APPROVAL.

Create teams:

1. Publish Unlock Team
- Finds staged safe content
- Converts safe items from PENDING_APPROVAL to LIVE/SUCCESS
- Leaves risky items as NEEDS_APPROVAL
- Writes proof/log event

2. Approval Gate Team
- Classifies content:
  SAFE_AUTO_PUBLISH
  NEEDS_APPROVAL
  NEEDS_API
  NEEDS_LINK
  BLOCKED
- Reasons must be included

3. Frontend Sync Team
- Ensures /news reads news_items
- Ensures /media reads media_items
- Ensures /live-feed reads logs/proof events
- Ensures /status reads launch status

4. Safe Fallback Team
- Item shop fallback must say:
  "Live item shop sync needs a safe API/source."
- Provide links:
  Official Fortnite Item Shop
  Fortnite.gg Shop Tracker
- Do not invent skins/prices.

5. Sitemap Fix Team
- Create/update public/sitemap.xml
- Include:
  /
  /news
  /media
  /item-shop
  /live-feed
  /status
  /best-fortnite-gear
  /guides
  /submit
- Use NEXT_PUBLIC_SITE_URL if available, else https://fortnite-hub.xyz

6. Monetisation Gate Team
- Keeps affiliate slots as NEEDS_LINK until real affiliate links are added
- Click tracking remains active
- Sponsor slots say AVAILABLE_FOR_SPONSORSHIP, not active campaign

7. Creator Media Gate Team
- Only publish YouTube embeds if a valid approved YouTube URL exists
- Manual placeholders must say NEEDS_APPROVED_LINK

Add files:
src/lib/reaper/publishUnlock/publishUnlockCrew.ts
src/app/api/reaper/publish-unlock/route.ts
src/app/api/reaper/publish-unlock/status/route.ts

Update if needed:
src/app/status/page.tsx
src/app/item-shop/page.tsx
src/app/live-feed/page.tsx
src/app/news/page.tsx
src/app/media/page.tsx
public/sitemap.xml

API behavior:
GET /api/reaper/publish-unlock/status
- returns current status report

POST /api/reaper/publish-unlock
- runs all teams
- creates safe starter public items if DB/memory empty:
  1. System live event
  2. Official Fortnite News source card
  3. Epic Status source card
  4. Media queue ready card
  5. Affiliate setup ready card
- writes logs/proof events
- returns JSON report

Statuses:
LIVE
SUCCESS
READY
NEEDS_APPROVAL
NEEDS_API
NEEDS_LINK
NEEDS_DNS
NEEDS_ENV
BLOCKED

Make npm run build pass.
Do not add new admin tabs.
