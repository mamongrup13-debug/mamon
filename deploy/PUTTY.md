# PuTTY ile sunucuya bağlanma

## Neden şifre çalışmıyor?

Sunucu SSH’da **sadece anahtar** kabul ediyor; şifre ile giriş kapalı.  
Bu yüzden PuTTY + şifre **reddedilir** — Plesk admin şifresi SSH şifresi değildir.

---

## Adım 1 — Bir kez konsoldan çalıştırın (zorunlu)

Hosting panelinizde **VNC / KVM / Serial Console** açın, root olun, şunu yapıştırın:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/mamongrup13-debug/mamon/main/deploy/putty-tek-komut.sh)"
```

GitHub erişimi yoksa `deploy/putty-tek-komut.sh` dosyasının içeriğini kopyalayıp yapıştırın.

---

## Adım 2 — PuTTY ayarları

| Alan | Değer |
|------|--------|
| Host | `50.114.185.221` |
| Port | `22` |
| Connection type | SSH |

**Connection → SSH → Auth → Private key file:**

```
C:\Users\mamon\.ssh\mamon-server.ppk
```

(veya OpenSSH: `C:\Users\mamon\.ssh\id_ed25519_mamon` — PuTTY 0.78+)

**Connection → Data → Auto-login username:** `root`

**Open** → ilk seferde host key → Accept

---

## Adım 3 — Plesk SSH Terminal

PuTTY ile bağlandıktan veya konsol scripti çalıştıktan sonra:

Plesk → SSH Terminal sayfasını **yenileyin** (F5).

---

## PuTTY ile deploy

```bash
cd /var/www/vhosts/mamon.com.tr/git/mamon
bash deploy/remote-install.sh
```
