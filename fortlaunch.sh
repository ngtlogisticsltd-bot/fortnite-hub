#!/usr/bin/env bash
set -e

echo "================================================="
echo " FITHUB LAUNCH PREP"
echo "================================================="

PROJECT_DIR="/home/operator-01/.gemini/antigravity/scratch/fortnite-hub"

cd "$PROJECT_DIR"

echo
echo "Step 1: Checking project folder..."
test -f package.json || { echo "ERROR: package.json not found"; exit 1; }

echo
echo "Step 2: Creating .env.local if missing..."
if [ ! -f .env.local ]; then
cat > .env.local <<ENV
ADMIN_USER=reaper
ADMIN_PASS=CHANGE_ME_NOW
NEXT_PUBLIC_SITE_NAME=FortHub
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CREATOR_CODE=
NEXT_PUBLIC_ADSENSE_ID=
NEXT_PUBLIC_ANALYTICS_ID=
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NEWSLETTER_API_KEY=
GITHUB_REPO_URL=
ENV
echo ".env.local created"
else
echo ".env.local already exists"
fi

echo
echo "Step 3: Creating .gitignore..."
cat > .gitignore <<'GITIGNORE'
node_modules
.next
.env
.env.local
.env.production
npm-debug.log*
.DS_Store
.vercel
GITIGNORE

echo
echo "Step 4: Running production build..."
npm run build

echo
echo "Step 5: Initialising git repo..."
if [ ! -d .git ]; then
  git init
fi

git add .
git commit -m "FortHub launch build" || echo "Nothing new to commit"
git branch -M main

echo
echo "================================================="
echo " LOCAL PREP COMPLETE"
echo "================================================="
echo
echo "YOU NOW NEED TO DO ONLY THESE MANUAL STEPS:"
echo
echo "1. Create empty GitHub repo:"
echo "   https://github.com/new"
echo
echo "2. Copy your repo URL, then run:"
echo "   git remote add origin YOUR_GITHUB_REPO_URL"
echo "   git push -u origin main"
echo
echo "3. Go to Vercel:"
echo "   https://vercel.com"
echo "   Import the GitHub repo"
echo
echo "4. Add env vars in Vercel:"
echo "   ADMIN_USER"
echo "   ADMIN_PASS"
echo "   NEXT_PUBLIC_SITE_NAME"
echo "   NEXT_PUBLIC_SITE_URL"
echo
echo "5. Deploy."
echo
echo "IMPORTANT: Change ADMIN_PASS from CHANGE_ME_NOW."
echo "================================================="
