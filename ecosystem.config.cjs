// PM2 Configuration for Production
// Usage: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: 'neighborlyone-web',
      script: './build/server/index.js',
      instances: 'max', // Use all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '1G',
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
      // Restart on crashes
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
};
