/** PM2 ile canlı sunucuda çalıştırma: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: 'mamon',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --port 3001',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
}
