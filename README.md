# Mamon — Kurumsal Web Sitesi

**mamon.com.tr** için Chisfis tarzı kurumsal Next.js demo sitesi.

## Özellikler

- Kurumsal vitrin (emlak, inşaat, turizm)
- SEO: metadata, sitemap, robots, JSON-LD
- Admin panel: sayfa ve bölüm yönetimi
- JSON tabanlı CMS (demo)

## Kurulum

```powershell
cd c:\laragon\www\mamon
npm install
npm run dev
```

Site: http://localhost:3001  
Admin: http://localhost:3001/admin/giris (şifre: `mamon2026`)

## Sayfalar

| URL | Açıklama |
|-----|----------|
| `/` | Ana sayfa |
| `/hakkimizda` | Kurumsal hikaye |
| `/hizmetler` | 3 ana hizmet alanı |
| `/hizmetler/emlak` | Emlak detay |
| `/hizmetler/insaat` | İnşaat detay |
| `/hizmetler/turizm` | Turizm detay |
| `/projeler` | Proje portföyü |
| `/iletisim` | İletişim formu |

## Admin

- **Sayfalar** — SEO + bölüm sırası
- **Bölümler** — Hero, hakkımızda, hizmetler, projeler vb.
- **Ayarlar** — Şirket bilgileri, menü, footer

İçerik `src/data/site-content.json` dosyasına kaydedilir.

## Git & Canlı Sunucu Yayını

### 1. Git'e gönderme (lokal)

```powershell
cd c:\laragon\www\mamon
git init
git add .
git commit -m "Mamon kurumsal site ilk sürüm"
git remote add origin https://github.com/KULLANICI/mamon.git
git push -u origin main
```

`.env.local` ve `node_modules` git'e **dahil edilmez** (`.gitignore`).

### 2. Sunucuda ortam değişkenleri

Sunucu IP'si veya domain farklıysa `.env.local` dosyasını **sunucuda** oluşturun:

```bash
cp .env.example .env.local
nano .env.local
```

**Bu proje için sunucu (`50.114.185.221`) `.env.local` örneği:**

```env
NEXT_PUBLIC_SITE_URL=http://50.114.185.221:3001
NEXT_PUBLIC_SITE_NAME=Mamon
ADMIN_PASSWORD=guclu-bir-sifre-belirleyin
PORT=3001
```

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canlı adres. Sunucu: `http://50.114.185.221:3001` — Domain: `https://mamon.com.tr` |
| `ADMIN_PASSWORD` | Admin giriş şifresi (güçlü seçin) |
| `PORT` | Uygulama portu (varsayılan `3001`) |

SEO, sitemap ve Open Graph bu URL'yi kullanır; sunucudaki gerçek adresi yazın.

### 3. Sunucuda kurulum (Linux / VPS)

```bash
git clone https://github.com/KULLANICI/mamon.git
cd mamon
cp .env.example .env.local
# .env.local içinde NEXT_PUBLIC_SITE_URL ve ADMIN_PASSWORD düzenleyin

npm ci
npm run build
npm run start
# veya PM2:
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Admin panelinin içerik kaydetmesi için `src/data/site-content.json` dosyasına yazma izni gerekir:

```bash
chmod 664 src/data/site-content.json
```

### 4. Domain + Nginx (önerilen)

IP yerine `mamon.com.tr` kullanacaksanız DNS A kaydını sunucu IP'sine yönlendirin. Nginx örneği:

```nginx
server {
    listen 80;
    server_name mamon.com.tr www.mamon.com.tr;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

SSL için: `certbot --nginx -d mamon.com.tr -d www.mamon.com.tr`

`.env.local` içinde: `NEXT_PUBLIC_SITE_URL=https://mamon.com.tr`
