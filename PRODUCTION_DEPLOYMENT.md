# 🚀 NeighborlyOne - Production Deployment Guide

## 📋 Server Information
- **IP Address:** 34.26.14.36
- **Username:** jaeminkoo
- **Deploy Path:** `/var/www/neighborlyone.com`
- **Application Port:** 4000
- **Domain:** neighborlyone.com (future)

## 🌐 Architecture

```
/var/www/
├── neighborlyone.com/          # Your site
│   ├── src/
│   ├── build/
│   ├── node_modules/
│   ├── .env
│   └── package.json
├── [other-site-1]/
└── [other-site-2]/
```

---

## 🚀 Initial Deployment

### Step 1: Connect to Server

```bash
ssh jaeminkoo@34.26.14.36
```

### Step 2: Upload Deployment Script

**From your local machine:**
```bash
scp "/Users/jaeminkoo/Project2025/Neiborly One/apps/web/deploy-production.sh" jaeminkoo@34.26.14.36:~/
```

Or manually create it on the server:
```bash
nano ~/deploy-production.sh
# Paste the script content
chmod +x ~/deploy-production.sh
```

### Step 3: Run Deployment

```bash
sudo ./deploy-production.sh
```

This will:
- ✅ Install Node.js and PM2 (if needed)
- ✅ Create `/var/www/neighborlyone.com/`
- ✅ Clone repository from GitHub
- ✅ Create `.env` file
- ✅ Install dependencies
- ✅ Build application
- ✅ Start with PM2
- ✅ Configure auto-start on reboot

### Step 4: Verify Deployment

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs neighborlyone-web

# Test locally
curl http://localhost:4000
```

### Step 5: Access from Browser

Open: **http://34.26.14.36:4000**

---

## 🔄 Updating Your Application

### Method 1: Using Update Script (Recommended)

**1. Upload update script to server:**
```bash
scp "/Users/jaeminkoo/Project2025/Neiborly One/apps/web/update-production.sh" jaeminkoo@34.26.14.36:/var/www/neighborlyone.com/
```

**2. Make it executable:**
```bash
ssh jaeminkoo@34.26.14.36
cd /var/www/neighborlyone.com
chmod +x update-production.sh
```

**3. Run updates:**
```bash
cd /var/www/neighborlyone.com
./update-production.sh
```

### Method 2: Manual Update

```bash
ssh jaeminkoo@34.26.14.36
cd /var/www/neighborlyone.com

# Pull latest code
git pull origin main

# Install dependencies
npm install --legacy-peer-deps

# Build
npm run build

# Restart
pm2 restart neighborlyone-web

# Check status
pm2 status
```

---

## 🌐 Nginx Configuration (Port 80/443)

If you want to access via domain name or port 80:

### Install Nginx (if not installed)

```bash
sudo apt update
sudo apt install nginx -y
```

### Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/neighborlyone.com
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name neighborlyone.com www.neighborlyone.com 34.26.14.36;

    # Logging
    access_log /var/log/nginx/neighborlyone.access.log;
    error_log /var/log/nginx/neighborlyone.error.log;

    # Proxy to Node.js application
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optional: Serve static files directly from Nginx
    location /static/ {
        alias /var/www/neighborlyone.com/build/client/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/neighborlyone.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

Now access at: **http://neighborlyone.com** or **http://34.26.14.36**

---

## 🔒 SSL/HTTPS with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d neighborlyone.com -d www.neighborlyone.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

Now access at: **https://neighborlyone.com**

---

## 🔥 Firewall Configuration

### Google Cloud Firewall

1. Go to [GCP Console](https://console.cloud.google.com/)
2. Navigate to **VPC Network > Firewall**
3. Create/Edit firewall rules:
   - Allow TCP port `4000` (for direct access)
   - Allow TCP port `80` (HTTP)
   - Allow TCP port `443` (HTTPS)

### UFW (Ubuntu Firewall)

```bash
# Allow ports
sudo ufw allow 4000/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow ssh

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 📊 Monitoring & Management

### PM2 Commands

```bash
# View status
pm2 status

# View logs (all)
pm2 logs neighborlyone-web

# View logs (last 100 lines)
pm2 logs neighborlyone-web --lines 100

# View logs (follow mode)
pm2 logs neighborlyone-web --lines 0

# Resource monitoring
pm2 monit

# Restart application
pm2 restart neighborlyone-web

# Stop application
pm2 stop neighborlyone-web

# Delete from PM2
pm2 delete neighborlyone-web
```

### Nginx Commands

```bash
# Check status
sudo systemctl status nginx

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/neighborlyone.access.log
sudo tail -f /var/log/nginx/neighborlyone.error.log
```

### Check Application

```bash
# Check if app is running
curl http://localhost:4000

# Check port usage
sudo lsof -i :4000

# Check Nginx status
sudo lsof -i :80
```

---

## 🔧 Troubleshooting

### Application won't start

```bash
# Check logs
pm2 logs neighborlyone-web

# Check if port is in use
sudo lsof -i :4000

# Kill process if needed
sudo kill -9 <PID>

# Restart PM2
pm2 restart all
```

### Permission Errors

```bash
# Fix ownership
sudo chown -R jaeminkoo:jaeminkoo /var/www/neighborlyone.com

# Fix permissions
sudo chmod -R 755 /var/www/neighborlyone.com
```

### Database Connection Issues

```bash
# Check .env file
cat /var/www/neighborlyone.com/.env

# Test database connection
psql "postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres"
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Out of Disk Space

```bash
# Check disk usage
df -h

# Clean PM2 logs
pm2 flush

# Clean old logs
sudo find /var/log -type f -name "*.log" -mtime +30 -delete

# Clean npm cache
npm cache clean --force
```

---

## 📁 Directory Structure

```
/var/www/neighborlyone.com/
├── __create/                   # Build artifacts
├── plugins/                    # Build plugins
├── src/                        # Source code
│   ├── app/                   # Application routes
│   ├── utils/                 # Utilities
│   └── global.css             # Styles
├── build/                      # Production build
├── node_modules/               # Dependencies
├── .env                        # Environment variables
├── .git/                       # Git repository
├── package.json                # Dependencies
├── deploy-production.sh        # Deployment script
├── update-production.sh        # Update script
└── README.deployment.md        # Documentation
```

---

## 🔄 Daily Workflow

### 1. Develop Locally
```bash
cd "/Users/jaeminkoo/Project2025/Neiborly One/apps/web"
# Make changes
npm run dev  # Test locally
```

### 2. Commit & Push
```bash
git add .
git commit -m "Your changes"
git push origin main
```

### 3. Deploy to Server
```bash
ssh jaeminkoo@34.26.14.36
cd /var/www/neighborlyone.com
./update-production.sh
```

### 4. Verify
```bash
pm2 logs neighborlyone-web --lines 20
# Open browser: http://34.26.14.36:4000
```

---

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `ssh jaeminkoo@34.26.14.36` | Connect to server |
| `cd /var/www/neighborlyone.com` | Go to site directory |
| `./update-production.sh` | Update application |
| `pm2 status` | Check app status |
| `pm2 logs neighborlyone-web` | View logs |
| `pm2 restart neighborlyone-web` | Restart app |
| `sudo systemctl reload nginx` | Reload Nginx |

---

## 🆘 Emergency Procedures

### If site is down:

```bash
# 1. Check PM2 status
pm2 status

# 2. Check logs
pm2 logs neighborlyone-web --lines 50

# 3. Restart application
pm2 restart neighborlyone-web

# 4. If still down, rebuild
cd /var/www/neighborlyone.com
npm run build
pm2 restart neighborlyone-web

# 5. Check Nginx
sudo systemctl status nginx
sudo nginx -t
```

### Rollback to previous version:

```bash
cd /var/www/neighborlyone.com
git log  # Find previous commit
git reset --hard <commit-hash>
npm install --legacy-peer-deps
npm run build
pm2 restart neighborlyone-web
```

---

## 📞 Support

**Application Logs:** `/var/www/neighborlyone.com/logs/`
**Nginx Logs:** `/var/log/nginx/neighborlyone.*.log`
**PM2 Logs:** `~/.pm2/logs/`

**GitHub Repository:** https://github.com/jaeminkoo-ui/neighborlyone

---

## ✅ Post-Deployment Checklist

- [ ] Application running on port 4000
- [ ] PM2 process active
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] Nginx configured (if using)
- [ ] SSL certificate installed (if using HTTPS)
- [ ] Firewall rules configured
- [ ] PM2 startup configured
- [ ] Backup strategy in place
- [ ] Monitoring configured

---

**Deployment Date:** _____________________
**Deployed By:** jaeminkoo
**Server:** 34.26.14.36
**Location:** /var/www/neighborlyone.com









