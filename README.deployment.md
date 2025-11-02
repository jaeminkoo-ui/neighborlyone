# NeighborlyOne Web App - Deployment Guide

## 🌐 Server Information
- **IP Address:** 34.26.14.36
- **Username:** jaeminkoo
- **Port:** 4000

## 📋 Prerequisites

Before deploying, make sure you have:
1. SSH access to the server
2. Database connection string (Supabase)
3. Git installed (optional, for easier deployment)

## 🚀 Deployment Methods

### Method 1: Automated Deployment (Recommended)

1. **Connect to your server via SSH:**
   ```bash
   ssh jaeminkoo@34.26.14.36
   ```

2. **Upload the project files to the server:**
   
   **Option A: Using Git (Recommended)**
   ```bash
   cd ~
   git clone <your-git-repository-url> neighborly-web
   cd neighborly-web/apps/web
   ```
   
   **Option B: Using SCP from your local machine**
   ```bash
   # Run this from your local machine (not on server)
   scp -r "/Users/jaeminkoo/Project2025/Neiborly One/apps/web" jaeminkoo@34.26.14.36:~/neighborly-web
   ```

3. **Run the deployment script:**
   ```bash
   cd ~/neighborly-web
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Access your application:**
   - Open browser: http://34.26.14.36:4000

---

### Method 2: Manual Deployment

If you prefer to deploy manually, follow these steps:

#### Step 1: Connect to Server
```bash
ssh jaeminkoo@34.26.14.36
```

#### Step 2: Install Node.js (if not installed)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Step 3: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

#### Step 4: Upload and Setup Project
```bash
# Create project directory
mkdir -p ~/neighborly-web
cd ~/neighborly-web

# Upload files using SCP (from your local machine)
# Or clone from git repository
```

#### Step 5: Configure Environment Variables
```bash
cd ~/neighborly-web
nano .env
```

Add the following content:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres

# Server Configuration
PORT=4000
NODE_ENV=production
```

#### Step 6: Install Dependencies
```bash
npm install --legacy-peer-deps
```

#### Step 7: Build the Application
```bash
npm run build
```

#### Step 8: Start with PM2
```bash
pm2 start npm --name "neighborly-web" -- start
pm2 save
pm2 startup
```

---

## 🔧 Server Management

### PM2 Commands
```bash
# View logs
pm2 logs neighborly-web

# Restart application
pm2 restart neighborly-web

# Stop application
pm2 stop neighborly-web

# Check status
pm2 status

# Monitor resources
pm2 monit
```

### Update Application
```bash
cd ~/neighborly-web

# If using Git
git pull origin main

# Install new dependencies
npm install --legacy-peer-deps

# Rebuild
npm run build

# Restart
pm2 restart neighborly-web
```

---

## 🌐 Optional: Setup Nginx Reverse Proxy

If you want to use a domain name and port 80/443:

### Install Nginx
```bash
sudo apt update
sudo apt install nginx -y
```

### Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/neighborly
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name 34.26.14.36;  # Or your domain name

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
}
```

### Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/neighborly /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Now access at: http://34.26.14.36

---

## 🔒 Firewall Configuration

Make sure port 4000 (or 80 if using Nginx) is open:

```bash
# Allow port 4000
sudo ufw allow 4000/tcp

# Or allow port 80 for Nginx
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check firewall status
sudo ufw status
```

For Google Cloud, also check firewall rules in GCP Console:
1. Go to VPC Network > Firewall
2. Create rule to allow TCP port 4000 (or 80/443)

---

## 📊 Monitoring

### Check if app is running
```bash
pm2 status
```

### View real-time logs
```bash
pm2 logs neighborly-web --lines 100
```

### Check resource usage
```bash
pm2 monit
```

---

## 🐛 Troubleshooting

### Application won't start
```bash
# Check logs
pm2 logs neighborly-web

# Check if port is already in use
sudo lsof -i :4000

# Restart PM2
pm2 restart all
```

### Database connection issues
```bash
# Check if DATABASE_URL is set
cat .env

# Test database connection
psql "postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres"
```

### Cannot access from browser
1. Check if application is running: `pm2 status`
2. Check if port 4000 is open in firewall
3. Check GCP firewall rules
4. Try accessing from server: `curl http://localhost:4000`

---

## 📞 Support

If you encounter any issues during deployment, check:
- PM2 logs: `pm2 logs neighborly-web`
- System logs: `sudo journalctl -u pm2-jaeminkoo`
- Nginx logs (if using): `sudo tail -f /var/log/nginx/error.log`

---

## 🎉 Success!

Once deployed, your application will be accessible at:
- **Direct:** http://34.26.14.36:4000
- **With Nginx:** http://34.26.14.36

The application will automatically restart if the server reboots thanks to PM2.

