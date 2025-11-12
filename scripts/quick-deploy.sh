#!/bin/bash

# NeighborlyOne - One-Click Deployment Script
# Run this on your server: bash <(curl -s https://raw.githubusercontent.com/jaeminkoo-ui/neighborlyone/main/quick-deploy.sh)

set -e  # Exit on error

echo "🚀 NeighborlyOne - Automatic Deployment Starting..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SITE_DIR="/var/www/neighborlyone.com"
SITE_USER="jaeminkoo"
APP_PORT="4000"
APP_NAME="neighborlyone-web"

# Check if running as root or with sudo
if [ "$EUID" -eq 0 ]; then
    SUDO=""
    echo -e "${GREEN}✓ Running with root privileges${NC}"
else
    SUDO="sudo"
    echo -e "${YELLOW}⚠ Running without root. Will use sudo for system operations.${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  NeighborlyOne Deployment"
echo "  Server: 34.26.14.36"
echo "  Location: $SITE_DIR"
echo "  Port: $APP_PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Check and install Node.js
echo -e "${BLUE}[1/10] 📦 Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | $SUDO bash -
    $SUDO apt-get install -y nodejs
    echo -e "${GREEN}✓ Node.js installed: $(node -v)${NC}"
else
    echo -e "${GREEN}✓ Node.js already installed: $(node -v)${NC}"
fi

# Step 2: Check and install PM2
echo -e "${BLUE}[2/10] 📦 Checking PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    $SUDO npm install -g pm2
    echo -e "${GREEN}✓ PM2 installed${NC}"
else
    echo -e "${GREEN}✓ PM2 already installed${NC}"
fi

# Step 3: Enable Apache modules
echo -e "${BLUE}[3/10] 🔧 Enabling Apache modules...${NC}"
$SUDO a2enmod proxy proxy_http rewrite headers ssl proxy_wstunnel 2>/dev/null || true
echo -e "${GREEN}✓ Apache modules enabled${NC}"

# Step 4: Create directory and clone repository
echo -e "${BLUE}[4/10] 📁 Setting up project directory...${NC}"
if [ -d "$SITE_DIR" ]; then
    echo "Directory exists. Pulling latest changes..."
    cd $SITE_DIR
    $SUDO -u $SITE_USER git pull origin main
else
    echo "Cloning repository..."
    cd /var/www/
    $SUDO git clone https://github.com/jaeminkoo-ui/neighborlyone.git neighborlyone.com
    $SUDO chown -R $SITE_USER:$SITE_USER $SITE_DIR
fi
echo -e "${GREEN}✓ Project directory ready${NC}"

# Step 5: Create .env file
echo -e "${BLUE}[5/10] 📝 Creating environment file...${NC}"
cd $SITE_DIR
if [ ! -f ".env" ]; then
    $SUDO -u $SITE_USER cat > .env << 'ENVEOF'
# Database Configuration
DATABASE_URL=postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres

# Server Configuration
PORT=4000
NODE_ENV=production
ENVEOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Step 6: Install dependencies
echo -e "${BLUE}[6/10] 📦 Installing dependencies...${NC}"
cd $SITE_DIR
$SUDO -u $SITE_USER npm install --legacy-peer-deps
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 7: Build application
echo -e "${BLUE}[7/10] 🔨 Building application...${NC}"
cd $SITE_DIR
$SUDO -u $SITE_USER npm run build
echo -e "${GREEN}✓ Application built${NC}"

# Step 8: Setup PM2
echo -e "${BLUE}[8/10] 🚀 Setting up PM2...${NC}"
cd $SITE_DIR
$SUDO -u $SITE_USER pm2 stop $APP_NAME 2>/dev/null || true
$SUDO -u $SITE_USER pm2 delete $APP_NAME 2>/dev/null || true
$SUDO -u $SITE_USER pm2 start npm --name "$APP_NAME" -- start
$SUDO -u $SITE_USER pm2 save
echo -e "${GREEN}✓ PM2 configured${NC}"

# Step 9: Setup PM2 startup
echo -e "${BLUE}[9/10] 🔄 Setting up auto-start...${NC}"
$SUDO env PATH=$PATH:/usr/bin pm2 startup systemd -u $SITE_USER --hp /home/$SITE_USER 2>/dev/null || true
echo -e "${GREEN}✓ Auto-start configured${NC}"

# Step 10: Configure Apache Virtual Host
echo -e "${BLUE}[10/10] 🌐 Configuring Apache...${NC}"
APACHE_CONF="/etc/apache2/sites-available/neighborlyone.conf"
if [ ! -f "$APACHE_CONF" ]; then
    echo "Creating Apache virtual host..."
    $SUDO tee $APACHE_CONF > /dev/null << 'APACHEEOF'
<VirtualHost *:80>
    ServerName neighborlyone.com
    ServerAlias www.neighborlyone.com
    ServerAdmin admin@neighborlyone.com

    ErrorLog ${APACHE_LOG_DIR}/neighborlyone-error.log
    CustomLog ${APACHE_LOG_DIR}/neighborlyone-access.log combined

    ProxyPreserveHost On
    ProxyPass / http://localhost:4000/
    ProxyPassReverse / http://localhost:4000/

    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:4000/$1" [P,L]

    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
APACHEEOF
    
    $SUDO a2ensite neighborlyone.conf
    $SUDO apache2ctl configtest 2>/dev/null || true
    $SUDO systemctl reload apache2
    echo -e "${GREEN}✓ Apache configured${NC}"
else
    echo -e "${GREEN}✓ Apache already configured${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Deployment Completed Successfully!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}📊 Application Status:${NC}"
$SUDO -u $SITE_USER pm2 list | grep $APP_NAME || $SUDO -u $SITE_USER pm2 status
echo ""
echo -e "${GREEN}🌐 Your Application:${NC}"
echo -e "   📁 Location:    ${BLUE}$SITE_DIR${NC}"
echo -e "   🔌 Direct Port: ${BLUE}http://34.26.14.36:$APP_PORT${NC}"
echo -e "   🌐 Via Apache:  ${BLUE}http://34.26.14.36${NC}"
echo -e "   🌍 Domain:      ${BLUE}http://neighborlyone.com${NC} ${YELLOW}(after DNS setup)${NC}"
echo ""
echo -e "${YELLOW}📝 Useful Commands:${NC}"
echo "   pm2 logs $APP_NAME          - View logs"
echo "   pm2 restart $APP_NAME       - Restart app"
echo "   pm2 status                  - Check status"
echo "   cd $SITE_DIR                - Go to app directory"
echo ""
echo -e "${YELLOW}🔄 To update your app:${NC}"
echo "   cd $SITE_DIR"
echo "   git pull origin main"
echo "   npm install --legacy-peer-deps"
echo "   npm run build"
echo "   pm2 restart $APP_NAME"
echo ""
echo -e "${GREEN}🎉 Happy coding!${NC}"
echo ""









