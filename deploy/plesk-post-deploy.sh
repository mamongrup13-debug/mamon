#!/bin/bash
set -e
cd "$(dirname "$0")/.."

echo "==> git pull"
git pull origin main

echo "==> npm ci && build"
npm ci
npm run build

chmod 664 src/data/site-content.json 2>/dev/null || true

if command -v pm2 >/dev/null; then
  pm2 restart mamon || pm2 start ecosystem.config.cjs
  pm2 save
  echo "==> pm2 restart tamam"
else
  echo "!! pm2 yok — npm install -g pm2"
fi

echo "==> Deploy bitti: $(grep NEXT_PUBLIC_SITE_URL .env.local 2>/dev/null || echo 'port 3001')"
