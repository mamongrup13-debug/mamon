#!/bin/bash
# VPS / Plesk konsolundan root olarak çalıştırın — SSH Terminal + anahtar erişimi

set -e

SSHD="/etc/ssh/sshd_config"
PANEL_INI="/usr/local/psa/admin/conf/panel.ini"
PUBKEY_FILE="$(dirname "$0")/SSH-ANAHTAR.txt"

echo "==> localhost root SSH (Plesk terminal için)"
if ! grep -q "Match Address 127.0.0.1" "$SSHD" 2>/dev/null; then
  cat >> "$SSHD" << 'EOF'

# Plesk SSH Terminal — sadece localhost
Match Address 127.0.0.1
    PermitRootLogin yes
EOF
fi

if [ -f "$PANEL_INI" ] && ! grep -q "rootAccessAllowed" "$PANEL_INI"; then
  cat >> "$PANEL_INI" << 'EOF'

[ext-ssh-terminal]
rootAccessAllowed = true
EOF
fi

systemctl restart sshd 2>/dev/null || service sshd restart

if [ -f "$PUBKEY_FILE" ]; then
  mkdir -p /root/.ssh
  chmod 700 /root/.ssh
  grep -vFf /root/.ssh/authorized_keys "$PUBKEY_FILE" >> /root/.ssh/authorized_keys 2>/dev/null || cat "$PUBKEY_FILE" >> /root/.ssh/authorized_keys
  chmod 600 /root/.ssh/authorized_keys
  echo "==> SSH anahtarı eklendi"
fi

echo "==> Tamam. Plesk SSH Terminal sayfasını yenileyin."
