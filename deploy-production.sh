#!/bin/bash

# NeighborlyOne Web App Production Deployment Script
# Deploy to: /var/www/neighborlyone.com
# Server: 34.26.14.36
# User: jaeminkoo

echo "🚀 Starting NeighborlyOne Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SITE_DIR="/var/www/neighborlyone.com"
SITE_USER="jaeminkoo"

# Check if running with sudo for /var/www/ access
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}This script needs sudo access to create /var/www/ directory${NC}"
    echo "Please run: sudo ./deploy-production.sh"
    exit 1
fi

echo -e "${BLUE}📦 Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Installing Node.js 20...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
else
    echo -e "${GREEN}✓ Node.js is installed: $(node -v)${NC}"
fi

echo -e "${BLUE}📦 Checking PM2 installation...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    npm install -g pm2
else
    echo -e "${GREEN}✓ PM2 is installed${NC}"
fi

# Create site directory if it doesn't exist
if [ ! -d "$SITE_DIR" ]; then
    echo -e "${BLUE}📁 Creating site directory: $SITE_DIR${NC}"
    mkdir -p "$SITE_DIR"
    chown -R $SITE_USER:$SITE_USER "$SITE_DIR"
    echo -e "${GREEN}✓ Directory created${NC}"
else
    echo -e "${GREEN}✓ Site directory exists${NC}"
fi

# Clone or pull repository
cd "$SITE_DIR" || exit 1

if [ -d ".git" ]; then
    echo -e "${BLUE}📥 Pulling latest changes...${NC}"
    sudo -u $SITE_USER git pull origin main
else
    echo -e "${BLUE}📥 Cloning repository...${NC}"
    cd /var/www/
    sudo -u $SITE_USER git clone https://github.com/jaeminkoo-ui/neighborlyone.git neighborlyone.com
    cd "$SITE_DIR" || exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
    sudo -u $SITE_USER cat > .env << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres

# Server Configuration
PORT=4000
NODE_ENV=production
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
sudo -u $SITE_USER npm install --legacy-peer-deps

# Build the application
echo -e "${BLUE}🔨 Building the application...${NC}"
sudo -u $SITE_USER npm run build

# Stop existing PM2 process if running
echo -e "${BLUE}🛑 Stopping existing PM2 process...${NC}"
sudo -u $SITE_USER pm2 stop neighborlyone-web || true
sudo -u $SITE_USER pm2 delete neighborlyone-web || true

# Start the application with PM2
echo -e "${BLUE}🚀 Starting application with PM2...${NC}"
cd "$SITE_DIR"
sudo -u $SITE_USER pm2 start npm --name "neighborlyone-web" -- start

# Save PM2 configuration
echo -e "${BLUE}💾 Saving PM2 configuration...${NC}"
sudo -u $SITE_USER pm2 save

# Setup PM2 to start on system boot
echo -e "${BLUE}🔄 Setting up PM2 startup script...${NC}"
env PATH=$PATH:/usr/bin pm2 startup systemd -u $SITE_USER --hp /home/$SITE_USER

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📊 Application Status:${NC}"
sudo -u $SITE_USER pm2 status

echo ""
echo -e "${GREEN}🌐 Deployment Information:${NC}"
echo -e "   Directory: ${BLUE}$SITE_DIR${NC}"
echo -e "   Application: ${BLUE}http://34.26.14.36:4000${NC}"
echo -e "   Domain (future): ${BLUE}http://neighborlyone.com${NC}"
echo ""
echo -e "${YELLOW}📝 Useful PM2 Commands:${NC}"
echo "   pm2 logs neighborlyone-web     - View application logs"
echo "   pm2 restart neighborlyone-web  - Restart application"
echo "   pm2 stop neighborlyone-web     - Stop application"
echo "   pm2 status                     - Check status"
echo ""
echo -e "${YELLOW}📝 Update Application:${NC}"
echo "   cd $SITE_DIR"
echo "   git pull origin main"
echo "   npm install --legacy-peer-deps"
echo "   npm run build"
echo "   pm2 restart neighborlyone-web"
echo ""

