#!/bin/bash
set -e

# Plesk varsayılan Git yolu veya argüman
APP_DIR="${1:-/var/www/vhosts/mamon.com.tr/git/mamon}"
REPO="https://github.com/mamongrup13-debug/mamon.git"

echo "==> Mamon kurulum: $APP_DIR"
mkdir -p "$(dirname "$APP_DIR")"

if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR" && git pull origin main
else
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

if [ ! -f .env.local ]; then
  cp deploy/plesk-env.example .env.local
  echo "!! .env.local oluşturuldu — ADMIN_PASSWORD ve DB_PASSWORD düzenleyin"
fi

export PATH="/usr/local/bin:/opt/plesk/node/18/bin:$PATH"
command -v node >/dev/null || { echo "Node.js yok — Plesk Node.js eklentisini kurun"; exit 1; }

echo "Node: $(node -v) | npm: $(npm -v)"

npm ci
npm run build
chmod 664 src/data/site-content.json 2>/dev/null || true

if ! command -v pm2 >/dev/null; then
  npm install -g pm2
fi

pm2 delete mamon 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo ""
echo "==> Kurulum tamam"
echo "    Lokal test: curl -I http://127.0.0.1:3001/tr"
echo "    Nginx proxy: deploy/nginx-plesk-directives.conf → Plesk panel"
echo "    Site: https://mamon.com.tr/tr"
