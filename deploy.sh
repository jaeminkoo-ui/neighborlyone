#!/bin/bash

# NeighborlyOne Web App Deployment Script
# Server: 34.26.14.36
# User: jaeminkoo

echo "🚀 Starting NeighborlyOne Web App Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Installing Node.js 20...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo -e "${GREEN}Node.js is already installed: $(node -v)${NC}"
fi

# Check if PM2 is installed
echo "📦 Checking PM2 installation..."
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 is not installed. Installing PM2...${NC}"
    sudo npm install -g pm2
else
    echo -e "${GREEN}PM2 is already installed${NC}"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL=postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres

# Server Configuration
PORT=4000
NODE_ENV=production
EOF
    echo -e "${GREEN}.env file created${NC}"
else
    echo -e "${GREEN}.env file already exists${NC}"
fi

# Build the application
echo "🔨 Building the application..."
npm run build

# Stop existing PM2 process if running
echo "🛑 Stopping existing PM2 process..."
pm2 stop neighborly-web || true
pm2 delete neighborly-web || true

# Start the application with PM2
echo "🚀 Starting application with PM2..."
pm2 start npm --name "neighborly-web" -- start

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 to start on system boot
echo "🔄 Setting up PM2 startup script..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u jaeminkoo --hp /home/jaeminkoo

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "📊 Application Status:"
pm2 status

echo ""
echo "🌐 Your application should be accessible at:"
echo "   http://34.26.14.36:4000"
echo ""
echo "📝 Useful PM2 Commands:"
echo "   pm2 logs neighborly-web     - View application logs"
echo "   pm2 restart neighborly-web  - Restart application"
echo "   pm2 stop neighborly-web     - Stop application"
echo "   pm2 status                  - Check status"
echo ""

