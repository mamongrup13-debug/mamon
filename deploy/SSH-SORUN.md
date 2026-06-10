# SSH Terminal kapalı — çözüm

Plesk’te **“SSH Terminal is not available”** hatası: sunucuda root SSH girişi kapalı.

SSH Terminal **şart değil**. Aşağıdaki yollardan birini kullanın.

---

## Yol 1 — SSH Terminal olmadan deploy (önerilen)

### A) Git ile kodu çekin

Plesk → **Domains** → `mamon.com.tr` → **Git** → Add Repository

- URL: `https://github.com/mamongrup13-debug/mamon.git`
- Branch: `main`
- **Pull / Deploy**

### B) `.env.local` — File Manager

Plesk → **File Manager** → proje klasörü (`git/mamon`)

`deploy/plesk-env.example` dosyasını kopyalayıp adını `.env.local` yapın.  
İçinde `ADMIN_PASSWORD` ve `DB_PASSWORD` değiştirin.

### C) Build — Zamanlanmış görev (Scheduled Tasks)

Plesk → `mamon.com.tr` → **Scheduled Tasks** → **Add Task**

| Alan | Değer |
|------|--------|
| Task type | Run a command |
| Command | `/bin/bash /var/www/vhosts/mamon.com.tr/git/mamon/deploy/remote-install.sh` |
| Run | Once, şimdi |

İlk kurulumdan sonra güncelleme için:

```bash
/bin/bash /var/www/vhosts/mamon.com.tr/git/mamon/deploy/plesk-post-deploy.sh
```

### D) Nginx proxy

Plesk → `mamon.com.tr` → **Apache & nginx Settings** → **Additional nginx directives**

`deploy/nginx-plesk-directives.conf` içeriğini yapıştırın → **OK / Apply**.

Site: `https://mamon.com.tr/tr`

---

## Yol 2 — SSH Terminal’i açmak

SSH Terminal’i kullanmak istiyorsanız, **VPS/hosting sağlayıcı konsolundan** (Plesk dışı) root girişi gerekir.

### Adımlar (VNC / KVM / Serial Console)

1. Hosting panelinde **Console / VNC** ile sunucuya girin  
2. Root olarak login olun  
3. Çalıştırın:

```bash
cd /var/www/vhosts/mamon.com.tr/git/mamon
bash deploy/enable-ssh-localhost.sh
```

4. Plesk’te **SSH Terminal** sayfasını yenileyin (F5)

Script şunları yapar:
- localhost için root SSH açar (dışarıdan kapalı kalır)
- `panel.ini` → `rootAccessAllowed = true`
- `deploy/SSH-ANAHTAR.txt` anahtarını ekler
- `sshd` yeniden başlatır

---

## Yol 3 — Hosting desteği

Destek talebi metni:

> Plesk SSH Terminal extension için localhost root SSH gerekli.  
> `/etc/ssh/sshd_config` sonuna `Match Address 127.0.0.1` + `PermitRootLogin yes` eklenmesi ve sshd restart istiyorum.

---

## Özet

| İhtiyaç | SSH Terminal gerekli mi? |
|---------|--------------------------|
| Site deploy | **Hayır** — Git + Scheduled Task |
| `.env.local` | **Hayır** — File Manager |
| Nginx proxy | **Hayır** — Plesk panel |
| SSH Terminal | **Evet** — VPS konsol + `enable-ssh-localhost.sh` |
