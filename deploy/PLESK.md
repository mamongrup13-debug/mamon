# Plesk Deploy — mamon.com.tr (50.114.185.221)

## Repo

```
https://github.com/mamongrup13-debug/mamon.git
```

Branch: `main`

---

## 1) Git ile kodu çekin

Plesk → **Domains** → `mamon.com.tr` → **Git** → **Add Repository**

| Alan | Değer |
|------|--------|
| URL | `https://github.com/mamongrup13-debug/mamon.git` |
| Branch | `main` |
| Deploy mode | Automatic veya Manual (Pull) |

Önerilen klasör (Plesk Git varsayılanı):

```
/var/www/vhosts/mamon.com.tr/git/mamon
```

veya `httpdocs` altına:

```
/var/www/vhosts/mamon.com.tr/httpdocs/mamon
```

---

## 2) `.env.local` oluşturun (sunucuda)

Proje klasöründe `deploy/plesk-env.example` dosyasını kopyalayın:

```bash
cd /var/www/vhosts/mamon.com.tr/git/mamon
cp deploy/plesk-env.example .env.local
nano .env.local
```

**Mutlaka değiştirin:** `ADMIN_PASSWORD`, `DB_PASSWORD`

---

## 3) Node.js + build

Plesk → **Node.js** eklentisi kurulu olmalı (Node 18+).

SSH veya Plesk **Scheduled Tasks** / terminal ile:

```bash
cd /var/www/vhosts/mamon.com.tr/git/mamon
npm ci
npm run build
chmod 664 src/data/site-content.json
```

---

## 4) PM2 ile çalıştırma (önerilen)

```bash
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Kontrol:

```bash
pm2 status
curl -I http://127.0.0.1:3001/tr
```

---

## 5) Domain → Node proxy (nginx)

Plesk → `mamon.com.tr` → **Apache & nginx Settings** → **Additional nginx directives**

`deploy/nginx-plesk-directives.conf` içeriğini yapıştırın.

Kaydedin → **Apply**.

Site: `https://mamon.com.tr/tr`

---

## 6) SSL

Plesk → **SSL/TLS Certificates** → Let's Encrypt → `mamon.com.tr` + `www.mamon.com.tr`

Sonra `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://mamon.com.tr
```

```bash
npm run build
pm2 restart mamon
```

---

## Güncelleme (her push sonrası)

```bash
cd /var/www/vhosts/mamon.com.tr/git/mamon
git pull
npm ci
npm run build
pm2 restart mamon
```

veya: `bash deploy/plesk-post-deploy.sh`

---

## SSH Terminal kapalıysa

`deploy/enable-ssh-localhost.sh` dosyasını VPS konsolundan root olarak çalıştırın.

SSH anahtarı: `deploy/SSH-ANAHTAR.txt`

---

## URL'ler

| | |
|---|---|
| Site | `https://mamon.com.tr/tr` |
| Admin | `https://mamon.com.tr/admin/giris` |
| GitHub | `mamongrup13-debug/mamon` (ayrı hesap) |
