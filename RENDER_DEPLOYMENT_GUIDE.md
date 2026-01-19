# Deploying Polis to Render.com

This guide walks you through deploying Polis (with Portuguese PT-PT translation support) to Render.com.

## 🏗️ Polis Architecture Overview

Polis consists of multiple services that need to be deployed:

1. **PostgreSQL Database** - Main data store
2. **Server** - Node.js API backend
3. **Math** - Python analytics engine
4. **Delphi** - AI/ML service (optional)
5. **Client Participation** - Main voting/commenting interface (frontend)
6. **Client Admin** - Administration dashboard (frontend)
7. **Client Report** - Reporting interface (frontend)
8. **File Server** - Static file serving

## 📋 Prerequisites

Before starting, ensure you have:

- [ ] A Render.com account ([Sign up here](https://render.com))
- [ ] Your Polis repository with the PT-PT translation changes merged
- [ ] Git repository accessible to Render (GitHub, GitLab, or Bitbucket)
- [ ] Environment variables ready (see `.env` file)

## 🚀 Deployment Options

### Option 1: Infrastructure as Code with render.yaml (Recommended)

This approach uses a `render.yaml` file to define all services in one blueprint.

### Option 2: Manual Service Creation via Render Dashboard

Create each service manually through the Render web interface.

---

## 🎯 Option 1: Using render.yaml Blueprint (Recommended)

### Step 1: Create render.yaml Configuration

Create a `render.yaml` file in your repository root:

```yaml
# Polis Render.com Blueprint
# This file defines all services needed to run Polis

databases:
  - name: polis-postgres
    databaseName: polis
    plan: starter # or standard/pro based on your needs
    region: oregon # choose your preferred region
    postgresMajorVersion: 15

services:
  # ============================================
  # Backend API Server
  # ============================================
  - type: web
    name: polis-server
    runtime: docker
    dockerfilePath: ./server/Dockerfile
    dockerContext: ./server
    plan: starter # or standard/pro
    region: oregon
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: DATABASE_URL
        fromDatabase:
          name: polis-postgres
          property: connectionString
      - key: DATABASE_SSL
        value: true
      # Add your other environment variables
      - key: DISABLE_XSRF_PROTECTION
        sync: false # Set in Render dashboard
      - key: ENCRYPTION_PASSWORD_00001
        generateValue: true
      - key: SESSION_SECRET
        generateValue: true
      - key: JWT_PRIVATE_KEY
        sync: false # Paste your JWT private key in dashboard
      - key: JWT_PUBLIC_KEY
        sync: false # Paste your JWT public key in dashboard
    healthCheckPath: /api/v3/server_ping

  # ============================================
  # Math Service (Analytics Engine)
  # ============================================
  - type: web
    name: polis-math
    runtime: docker
    dockerfilePath: ./math/Dockerfile
    dockerContext: ./math
    plan: starter
    region: oregon
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: polis-postgres
          property: connectionString
      - key: MATH_ENV
        value: prod
      - key: LOGGING_LEVEL
        value: warn
      - key: WEBSERVER_USERNAME
        generateValue: true
      - key: WEBSERVER_PASS
        generateValue: true
      - key: DATABASE_POOL_SIZE
        value: 10

  # ============================================
  # Delphi Service (AI/ML - Optional)
  # ============================================
  - type: web
    name: polis-delphi
    runtime: docker
    dockerfilePath: ./delphi/Dockerfile
    dockerContext: ./delphi
    plan: starter
    region: oregon
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: polis-postgres
          property: connectionString
      - key: ANTHROPIC_API_KEY
        sync: false # Set in dashboard if using Claude AI

  # ============================================
  # Client Participation (Main Frontend)
  # This includes your PT-PT translation!
  # ============================================
  - type: static
    name: polis-client-participation
    buildCommand: |
      cd client-participation
      npm ci
      npm run build:prod
    staticPublishPath: ./client-participation/dist
    pullRequestPreviewsEnabled: true
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    headers:
      - path: /*
        name: X-Frame-Options
        value: SAMEORIGIN
      - path: /*
        name: X-Content-Type-Options
        value: nosniff
    envVars:
      - key: NODE_ENV
        value: production

  # ============================================
  # Client Admin (Administration Dashboard)
  # ============================================
  - type: static
    name: polis-client-admin
    buildCommand: |
      cd client-admin
      npm ci
      npm run build:prod
    staticPublishPath: ./client-admin/dist
    pullRequestPreviewsEnabled: true
    routes:
      - type: rewrite
        source: /*
        destination: /index.html

  # ============================================
  # Client Report (Reporting Interface)
  # ============================================
  - type: static
    name: polis-client-report
    buildCommand: |
      cd client-report
      npm ci
      npm run build:prod
    staticPublishPath: ./client-report/dist

  # ============================================
  # File Server (Static Assets)
  # ============================================
  - type: web
    name: polis-file-server
    runtime: docker
    dockerfilePath: ./file-server/Dockerfile
    dockerContext: ./file-server
    plan: starter
    region: oregon
```

### Step 2: Push render.yaml to Your Repository

```bash
# Make sure you're on your translation branch
git add render.yaml
git commit -m "Add Render.com deployment configuration"
git push
```

### Step 3: Deploy via Render Dashboard

1. **Log in to Render.com**
2. Click **"New +"** → **"Blueprint"**
3. Select your repository
4. Choose the branch with your PT-PT translation (e.g., `claude/plan-pt-pt-translation-JyAiz`)
5. Render will detect the `render.yaml` file
6. Click **"Apply"**

Render will now:
- Create the PostgreSQL database
- Build all Docker images
- Deploy all services
- Set up networking between services

### Step 4: Configure Sensitive Environment Variables

Some environment variables can't be stored in `render.yaml` for security. Set these in the Render dashboard:

For **polis-server** service:
- `ENCRYPTION_PASSWORD_00001`: Your encryption password
- `SESSION_SECRET`: Random secret (use `openssl rand -hex 32`)
- `JWT_PRIVATE_KEY`: Contents of `server/keys/jwt-private.pem`
- `JWT_PUBLIC_KEY`: Contents of `server/keys/jwt-public.pem`
- `GOOGLE_CREDENTIALS_BASE64`: (If using Google Translate API for comments)
- Auth provider credentials (Facebook, Twitter, etc.)

### Step 5: Run Database Migrations

After the server is deployed:

1. Go to **polis-server** service in Render dashboard
2. Click **"Shell"** tab
3. Run migrations:

```bash
npm run migrations:up
```

---

## 🛠️ Option 2: Manual Service Creation

If you prefer not to use `render.yaml`, here's how to create each service manually:

### 1. Create PostgreSQL Database

1. In Render dashboard: **New +** → **PostgreSQL**
2. Name: `polis-postgres`
3. Database: `polis`
4. Plan: Choose based on your needs (Starter, Standard, Pro)
5. Region: Select your preferred region
6. Click **Create Database**
7. **Save the connection string** - you'll need it for other services

### 2. Deploy Server (API Backend)

1. **New +** → **Web Service**
2. Connect your repository
3. Configure:
   - **Name**: `polis-server`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./server/Dockerfile`
   - **Docker Context**: `./server`
   - **Instance Type**: Starter or higher
4. Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=[paste from postgres database]
   DATABASE_SSL=true
   ENCRYPTION_PASSWORD_00001=[generate secure password]
   SESSION_SECRET=[generate with: openssl rand -hex 32]
   JWT_PRIVATE_KEY=[paste contents of jwt-private.pem]
   JWT_PUBLIC_KEY=[paste contents of jwt-public.pem]
   ```
5. Health Check Path: `/api/v3/server_ping`
6. Click **Create Web Service**

### 3. Deploy Math Service

1. **New +** → **Web Service**
2. Connect repository
3. Configure:
   - **Name**: `polis-math`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./math/Dockerfile`
   - **Docker Context**: `./math`
4. Environment Variables:
   ```
   DATABASE_URL=[paste from postgres database]
   MATH_ENV=prod
   LOGGING_LEVEL=warn
   WEBSERVER_USERNAME=[generate username]
   WEBSERVER_PASS=[generate password]
   DATABASE_POOL_SIZE=10
   ```
5. Click **Create Web Service**

### 4. Deploy Client Participation (Includes PT-PT Translation)

1. **New +** → **Static Site**
2. Connect repository
3. Configure:
   - **Name**: `polis-client-participation`
   - **Build Command**:
     ```bash
     cd client-participation && npm ci && npm run build:prod
     ```
   - **Publish Directory**: `client-participation/dist`
4. Click **Create Static Site**

**🎉 Your PT-PT translation is now live!**

Users can access it via:
- `?ui_lang=pt-PT` URL parameter
- Browser language detection (Accept-Language: pt-PT)

### 5. Deploy Client Admin

1. **New +** → **Static Site**
2. Configure:
   - **Name**: `polis-client-admin`
   - **Build Command**: `cd client-admin && npm ci && npm run build:prod`
   - **Publish Directory**: `client-admin/dist`

### 6. Deploy Client Report

1. **New +** → **Static Site**
2. Configure:
   - **Name**: `polis-client-report`
   - **Build Command**: `cd client-report && npm ci && npm run build:prod`
   - **Publish Directory**: `client-report/dist`

### 7. Deploy File Server (Optional)

1. **New +** → **Web Service**
2. Configure:
   - **Name**: `polis-file-server`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./file-server/Dockerfile`

---

## 🔗 Connecting Services Together

### Service URLs

After deployment, Render will provide URLs for each service:
- Server: `https://polis-server.onrender.com`
- Math: `https://polis-math.onrender.com`
- Client Participation: `https://polis-client-participation.onrender.com`
- etc.

### Update Environment Variables with Service URLs

Go back to **polis-server** and add:

```
STATIC_FILES_DOMAIN=https://polis-client-participation.onrender.com
STATIC_FILES_ADMIN_DOMAIN=https://polis-client-admin.onrender.com
STATIC_FILES_REPORT_DOMAIN=https://polis-client-report.onrender.com
MATH_URL=https://polis-math.onrender.com
```

---

## 🌍 Testing Your PT-PT Translation

After deployment, test your Portuguese (Portugal) translation:

### Method 1: URL Parameter
```
https://polis-client-participation.onrender.com/[conversation-id]?ui_lang=pt-PT
```

### Method 2: Browser Language
1. Set your browser language to Portuguese (Portugal)
2. Visit your Polis instance
3. It should automatically load in PT-PT

### Method 3: Verify Translation File
```bash
curl https://polis-client-participation.onrender.com/js/strings/pt_pt.js
```

You should see your European Portuguese translations!

---

## 🔧 Post-Deployment Configuration

### 1. Custom Domain (Optional)

1. Go to your service in Render
2. Click **Settings** → **Custom Domain**
3. Add your domain (e.g., `polis.yoursite.com`)
4. Update DNS records as instructed
5. Render will automatically provision SSL certificates

### 2. Environment Variables

Key variables to configure for production:

**Authentication:**
- `FACEBOOK_APP_ID` & `FACEBOOK_APP_SECRET`
- `TWITTER_CONSUMER_KEY` & `TWITTER_CONSUMER_SECRET`
- Or configure OIDC for custom auth

**Email (for notifications):**
- `SENDGRID_API_KEY` or other email provider credentials

**Translation API (Optional):**
- `GOOGLE_CREDENTIALS_BASE64` - for auto-translating user comments
- `SHOULD_USE_TRANSLATION_API=true`

### 3. Database Backups

Render provides automated backups for PostgreSQL databases on paid plans. Configure:
1. Go to **polis-postgres** database
2. Navigate to **Backups** tab
3. Enable automatic backups

---

## 🚢 Deploying Updates (Including New Translations)

When you make changes (like adding more translations), here's how to deploy:

### Automatic Deployment

If you have **Auto-Deploy** enabled (default):

```bash
# Merge your translation branch to main
git checkout main
git merge claude/plan-pt-pt-translation-JyAiz
git push origin main
```

Render will automatically:
1. Detect the push
2. Rebuild affected services
3. Deploy with zero downtime

### Manual Deployment

1. Go to Render dashboard
2. Select the service (e.g., `polis-client-participation`)
3. Click **Manual Deploy** → **Deploy latest commit**

---

## 📊 Monitoring Your Deployment

### Service Logs

1. Go to any service in Render dashboard
2. Click **Logs** tab
3. View real-time logs

### Health Checks

Render automatically monitors:
- `/api/v3/server_ping` for the server
- HTTP status codes for all services

### Metrics

View metrics in Render dashboard:
- CPU usage
- Memory usage
- Request volume
- Response times

---

## 💰 Cost Estimation

### Starter Setup (Minimal)
- **PostgreSQL Starter**: $7/month
- **Server (Starter)**: $7/month
- **Math (Starter)**: $7/month
- **Static Sites**: FREE (3 included with paid services)
- **Total**: ~$21/month

### Production Setup (Recommended)
- **PostgreSQL Standard**: $25/month
- **Server (Standard)**: $25/month
- **Math (Standard)**: $25/month
- **Delphi (Standard)**: $25/month
- **Total**: ~$100/month

### Enterprise Setup
- Professional plans with dedicated resources
- Contact Render for custom pricing

---

## 🐛 Troubleshooting

### Build Failures

**Problem**: Docker build fails
**Solution**:
- Check Dockerfile paths are correct
- Ensure all dependencies are in package.json
- Check build logs for specific errors

### Database Connection Issues

**Problem**: Services can't connect to database
**Solution**:
- Verify `DATABASE_URL` is set correctly
- Ensure `DATABASE_SSL=true` for Render's PostgreSQL
- Check database is in same region as services

### Translation Not Loading

**Problem**: PT-PT translation doesn't appear
**Solution**:
- Clear browser cache
- Check build logs confirm `pt_pt.js` was included
- Test with explicit URL: `?ui_lang=pt-PT`
- Verify `client-participation/js/strings/pt_pt.js` exists in build

### Service Communication Errors

**Problem**: Services can't talk to each other
**Solution**:
- Use internal URLs: `https://polis-server` (without .onrender.com)
- Or use full Render URLs: `https://polis-server.onrender.com`
- Check environment variables point to correct service URLs

---

## 🔐 Security Checklist

Before going to production:

- [ ] All secrets stored as environment variables (not in code)
- [ ] JWT keys generated and configured
- [ ] Database encryption password set
- [ ] SSL/TLS enabled (automatic with Render)
- [ ] CORS configured for your domains
- [ ] Auth providers configured (Facebook, Twitter, OIDC)
- [ ] Disable XSRF protection only if necessary
- [ ] Set up database backups
- [ ] Configure proper SMTP for emails

---

## 🎉 Success!

Your Polis deployment is now live on Render.com with full Portuguese (Portugal) translation support!

### Quick Links

- **Main site**: `https://polis-client-participation.onrender.com`
- **Admin panel**: `https://polis-client-admin.onrender.com`
- **API**: `https://polis-server.onrender.com`
- **PT-PT Test**: `https://polis-client-participation.onrender.com/createuser?ui_lang=pt-PT`

### Next Steps

1. Create your first conversation
2. Test voting in PT-PT
3. Invite Portuguese speakers to participate
4. Monitor analytics in the admin panel
5. Set up custom domain
6. Configure email notifications
7. Share your deployment!

---

## 📚 Additional Resources

- [Render.com Documentation](https://render.com/docs)
- [Polis Knowledge Base](https://compdemocracy.org/Welcome)
- [Polis GitHub Repository](https://github.com/compdemocracy/polis)
- [Docker Documentation](https://docs.docker.com)

## 🆘 Need Help?

- [Render Community Forum](https://community.render.com)
- [Polis Discussions](https://github.com/compdemocracy/polis/discussions)
- [Render Support](https://render.com/support) (for paid plans)

---

**Created**: 2026-01-19
**Version**: 1.0
**Translation Branch**: `claude/plan-pt-pt-translation-JyAiz`
