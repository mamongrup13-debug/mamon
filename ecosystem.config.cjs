/** PM2: pm2 start ecosystem.config.cjs — Next.js .env.local otomatik okunur */
module.exports = {
  apps: [
    {
      name: 'mamon',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --port 3001',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
  ],
}
