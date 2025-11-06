# 🚀 GitHub Deployment Guide for NeighborlyOne

## 📋 Overview
This guide will help you deploy your NeighborlyOne web app using GitHub to your Google Cloud server (34.26.14.36).

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website
1. Go to https://github.com/new
2. Repository name: `neighborly-one` (or your preferred name)
3. Description: "NeighborlyOne - Local Business Coupon Platform"
4. Choose **Private** (recommended) or Public
5. **Do NOT** initialize with README, .gitignore, or license (we already have them)
6. Click "Create repository"

### Option B: Using GitHub CLI
```bash
gh repo create neighborly-one --private --source=. --remote=origin
```

---

## Step 2: Initialize Git and Push to GitHub

### From your local machine:

```bash
# Navigate to the web app directory
cd "/Users/jaeminkoo/Project2025/Neiborly One/apps/web"

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: NeighborlyOne web application"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/neighborly-one.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Step 3: Deploy to Google Cloud Server

### 3.1 Connect to your server
```bash
ssh jaeminkoo@34.26.14.36
```

### 3.2 Install Git (if not installed)
```bash
sudo apt update
sudo apt install git -y
```

### 3.3 Configure Git credentials
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3.4 Clone the repository
```bash
cd ~
git clone https://github.com/YOUR_USERNAME/neighborly-one.git
cd neighborly-one
```

**Note:** If your repository is private, you'll need to authenticate:
- Use personal access token: https://github.com/settings/tokens
- Or setup SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### 3.5 Create environment file
```bash
nano .env
```

Add this content:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres

# Server Configuration
PORT=4000
NODE_ENV=production
```

Save and exit (Ctrl+X, then Y, then Enter)

### 3.6 Run the deployment script
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Step 4: Verify Deployment

### Check if the app is running
```bash
pm2 status
```

### View logs
```bash
pm2 logs neighborly-web
```

### Test the application
```bash
curl http://localhost:4000
```

### Access from browser
Open: http://34.26.14.36:4000

---

## 🔄 Updating Your Application

When you make changes to your code, follow these steps:

### On your local machine:
```bash
# Navigate to project directory
cd "/Users/jaeminkoo/Project2025/Neiborly One/apps/web"

# Stage your changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

### On your server:
```bash
# Connect to server
ssh jaeminkoo@34.26.14.36

# Navigate to project
cd ~/neighborly-one

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install --legacy-peer-deps

# Rebuild the application
npm run build

# Restart the application
pm2 restart neighborly-web

# Check status
pm2 status
```

---

## 🤖 Automated Deployment Script

For easier updates, create this update script on your server:

```bash
nano ~/update-app.sh
```

Add this content:
```bash
#!/bin/bash

echo "🔄 Updating NeighborlyOne Web App..."

cd ~/neighborly-one

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting application..."
pm2 restart neighborly-web

echo "✅ Update complete!"
pm2 status
```

Make it executable:
```bash
chmod +x ~/update-app.sh
```

Now you can update with just one command:
```bash
~/update-app.sh
```

---

## 🔐 Security Best Practices

### 1. Use SSH Keys for GitHub (Recommended)

Generate SSH key on your server:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

Add the public key to GitHub:
```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the output and add it to GitHub: https://github.com/settings/keys

Now you can clone/pull without entering password:
```bash
git clone git@github.com:YOUR_USERNAME/neighborly-one.git
```

### 2. Use Personal Access Token

If using HTTPS, create a token: https://github.com/settings/tokens
- Select scopes: `repo` (for private repos)
- Use the token as your password when git asks

### 3. Store credentials (optional)
```bash
git config --global credential.helper store
```

**Warning:** This stores credentials in plain text. Use SSH keys for better security.

---

## 📊 GitHub Actions (Optional - Future Enhancement)

You can automate deployment with GitHub Actions:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Server

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: 34.26.14.36
          username: jaeminkoo
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ~/neighborly-one
            git pull origin main
            npm install --legacy-peer-deps
            npm run build
            pm2 restart neighborly-web
```

This will automatically deploy when you push to GitHub!

---

## 🐛 Troubleshooting

### Permission denied (publickey)
```bash
# Generate SSH key if you haven't
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to GitHub
cat ~/.ssh/id_ed25519.pub
```

### Authentication failed
```bash
# Use personal access token
# Create at: https://github.com/settings/tokens
# Use token as password when prompted
```

### Git pull fails
```bash
# Check remote URL
git remote -v

# Update if needed
git remote set-url origin https://github.com/YOUR_USERNAME/neighborly-one.git
```

### Merge conflicts
```bash
# If you have local changes
git stash
git pull origin main
git stash pop

# Or discard local changes
git reset --hard origin/main
```

---

## 📝 Summary

**Initial Setup:**
1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Clone on server
4. ✅ Setup environment variables
5. ✅ Deploy with script

**Regular Updates:**
1. ✅ Make changes locally
2. ✅ Commit and push to GitHub
3. ✅ SSH to server
4. ✅ Run `~/update-app.sh`

**Access:**
- Application: http://34.26.14.36:4000
- GitHub: https://github.com/YOUR_USERNAME/neighborly-one

---

## 🎉 You're Done!

Your application is now deployed and managed through GitHub! 

Any questions? Check the troubleshooting section or contact support.









