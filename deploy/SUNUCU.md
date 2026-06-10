# Sunucu: 50.114.185.221

## Hızlı kurulum

```bash
git clone <repo-url> mamon
cd mamon

cat > .env.local << 'EOF'
NEXT_PUBLIC_SITE_URL=http://50.114.185.221:3001
NEXT_PUBLIC_SITE_NAME=Mamon
ADMIN_PASSWORD=BURAYA_GUCLU_SIFRE
PORT=3001
EOF

npm ci
npm run build
chmod 664 src/data/site-content.json

npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Site: http://50.114.185.221:3001  
Admin: http://50.114.185.221:3001/admin/giris

## Firewall

Port 3001 dışarıya açık olmalı:

```bash
sudo ufw allow 3001/tcp
```

## Domain (mamon.com.tr) bağlandığında

1. DNS A kaydı → `50.114.185.221`
2. Nginx + SSL kurulumu (README.md)
3. `.env.local` güncelle: `NEXT_PUBLIC_SITE_URL=https://mamon.com.tr`
4. `npm run build` ve `pm2 restart mamon`
