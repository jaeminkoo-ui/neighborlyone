#!/bin/bash

# Neighborly One - Production Deployment Script
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Starting deployment..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# 2. Build the application
echo "🔨 Building application..."
NODE_ENV=production npm run build

# 3. Stop existing PM2 process (if running)
echo "🛑 Stopping existing processes..."
pm2 stop neighborlyone-web || true
pm2 delete neighborlyone-web || true

# 4. Start the application with PM2
echo "▶️  Starting application..."
pm2 start ecosystem.config.cjs

# 5. Save PM2 configuration
pm2 save

# 6. Setup PM2 to start on system boot (run once)
# pm2 startup

echo "✅ Deployment complete!"
echo ""
echo "Useful commands:"
echo "  pm2 status          - Check application status"
echo "  pm2 logs            - View logs"
echo "  pm2 monit           - Monitor resources"
echo "  pm2 restart all     - Restart application"
echo "  pm2 stop all        - Stop application"
