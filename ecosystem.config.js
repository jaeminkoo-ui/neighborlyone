module.exports = {
  apps: [{
    name: 'neighborlyone-web',
    script: 'build/server/index.js',
    cwd: '/var/www/neighborlyone.com',
    instances: 1,
    exec_mode: 'fork',
    node_args: '--enable-source-maps',
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
      DATABASE_URL: process.env.DATABASE_URL
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000
    },
    error_file: '/home/jaeminkoo/.pm2/logs/neighborlyone-web-error.log',
    out_file: '/home/jaeminkoo/.pm2/logs/neighborlyone-web-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    combine_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000
  }]
};

