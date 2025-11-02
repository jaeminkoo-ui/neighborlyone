#!/bin/bash

# NeighborlyOne - Production Server Update Script
# Location: /var/www/neighborlyone.com
# Run this to update the application after pushing to GitHub

echo "🔄 Updating NeighborlyOne Web App (Production)..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SITE_DIR="/var/www/neighborlyone.com"

# Change to project directory
cd "$SITE_DIR" || { echo -e "${RED}Error: Project directory not found${NC}"; exit 1; }

# Pull latest changes
echo -e "${BLUE}📥 Pulling latest changes from GitHub...${NC}"
git pull origin main

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to pull from GitHub${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Code updated${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Build application
echo -e "${BLUE}🔨 Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to build application${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Application built${NC}"
echo ""

# Restart with PM2
echo -e "${BLUE}🔄 Restarting application...${NC}"
pm2 restart neighborlyone-web

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Warning: Failed to restart with PM2${NC}"
    echo -e "${YELLOW}Trying to start fresh...${NC}"
    pm2 start npm --name "neighborlyone-web" -- start
fi

echo -e "${GREEN}✓ Application restarted${NC}"
echo ""

# Save PM2 configuration
pm2 save

# Show status
echo -e "${BLUE}📊 Current Status:${NC}"
pm2 status

echo ""
echo -e "${GREEN}✅ Update completed successfully!${NC}"
echo ""
echo -e "🌐 Application: ${BLUE}http://34.26.14.36:4000${NC}"
echo -e "📁 Location: ${BLUE}$SITE_DIR${NC}"
echo ""
echo "📝 View logs: ${YELLOW}pm2 logs neighborlyone-web${NC}"
echo ""

