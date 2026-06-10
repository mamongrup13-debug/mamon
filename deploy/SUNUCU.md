# Sunucu: 50.114.185.221 (Plesk)

**Plesk kullanıyorsanız:** [deploy/PLESK.md](./PLESK.md) dosyasını takip edin.

## Hızlı kurulum (SSH erişimi varsa)

```bash
git clone https://github.com/mamongrup13-debug/mamon.git
cd mamon
bash deploy/remote-install.sh
```

`.env.local` içinde `ADMIN_PASSWORD` ve `DB_PASSWORD` değiştirin.

## Manuel kurulum

```bash
cp deploy/plesk-env.example .env.local
nano .env.local
npm ci && npm run build
pm2 start ecosystem.config.cjs && pm2 save
```

## Nginx (mamon.com.tr)

`deploy/nginx-plesk-directives.conf` → Plesk → Apache & nginx → Additional nginx directives

## URL'ler

| | |
|---|---|
| Site | `https://mamon.com.tr/tr` |
| Admin | `https://mamon.com.tr/admin/giris` |
| Repo | `https://github.com/mamongrup13-debug/mamon.git` |

## SSH kapalıysa

VPS konsolundan: `bash deploy/enable-ssh-localhost.sh`

SSH anahtar satırı: `deploy/SSH-ANAHTAR.txt`
