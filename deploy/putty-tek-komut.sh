#!/bin/bash
# VPS / hosting KONSOLUNDAN yapıştırın (PuTTY bağlanmadan önce bir kez)
set -e

PUBKEY='ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIA/6qGvaOfFaD8uXmSTRLnSr3gJEdmsFO5rNvQ27OE1w mamon@DESKTOP-D0O2CLB'

# 1) SSH anahtarı — PuTTY ile bağlanabilmek için
mkdir -p /root/.ssh
chmod 700 /root/.ssh
grep -qF "$PUBKEY" /root/.ssh/authorized_keys 2>/dev/null || echo "$PUBKEY" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

# 2) Plesk SSH Terminal — sadece localhost root
SSHD=/etc/ssh/sshd_config
grep -q 'Match Address 127.0.0.1' "$SSHD" || cat >> "$SSHD" << 'EOF'

Match Address 127.0.0.1
    PermitRootLogin yes
EOF

PANEL=/usr/local/psa/admin/conf/panel.ini
if [ -f "$PANEL" ] && ! grep -q rootAccessAllowed "$PANEL"; then
  printf '\n[ext-ssh-terminal]\nrootAccessAllowed = true\n' >> "$PANEL"
fi

systemctl restart sshd 2>/dev/null || service sshd restart

echo "TAMAM — PuTTY (anahtar) ve Plesk SSH Terminal calismali."
