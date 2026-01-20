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

## 🚀 Deployment Method

This guide uses Render's Infrastructure as Code approach with a `render.yaml` file to define all services in one blueprint.

---

## 🎯 Deploying with render.yaml Blueprint

A `render.yaml` file already exists in the repository root. This Blueprint defines all services needed to run Polis.

### Step 1: Review the render.yaml Configuration

The existing `render.yaml` file in your repository includes:
- PostgreSQL database configuration
- Backend API server (polis-server)
- Math service (analytics engine)
- Three static sites for client interfaces (participation, admin, report)

### Step 2: Generate Required Secrets

Before deploying, generate the required environment variables:

```bash
# Generate JWT key pair (RSA 4096-bit)
openssl genrsa -out jwt-private.pem 4096
openssl rsa -in jwt-private.pem -pubout -out jwt-public.pem

# Generate session secret
openssl rand -hex 32

# Optional: Generate auth secrets if using Facebook/Twitter
# Facebook App Secret - obtained from Facebook Developer Console
# Twitter Consumer Secret - obtained from Twitter Developer Portal
```

Save these values securely - you'll need them in Step 5.

**Important:**
- `jwt-private.pem` and `jwt-public.pem` contain your JWT keys
- The `openssl rand -hex 32` output is your SESSION_SECRET
- Keep these values secure and never commit them to your repository

### Step 3: Push render.yaml to Your Repository

```bash
# The render.yaml file is already in the repository
# Just ensure you're on the correct branch (e.g., edge)
git checkout edge
git pull origin edge
```

### Step 4: Deploy via Render Dashboard

1. **Log in to Render.com**
2. Click **"New +"** → **"Blueprint"**
3. Select your repository
4. Choose the branch (e.g., `edge`)
5. Render will detect the `render.yaml` file
6. Click **"Apply"**

Render will now:
- Create the PostgreSQL database
- Build all Docker images
- Deploy all services
- Set up networking between services

### Step 5: Configure Sensitive Environment Variables

Some environment variables can't be stored in `render.yaml` for security. Set these in the Render dashboard:

For **polis-server** service:
- `SESSION_SECRET`: The random secret you generated in Step 2 (from `openssl rand -hex 32`)
- `JWT_PRIVATE_KEY`: Contents of `jwt-private.pem` you generated in Step 2
- `JWT_PUBLIC_KEY`: Contents of `jwt-public.pem` you generated in Step 2
- `GOOGLE_CREDENTIALS_BASE64`: (Optional - if using Google Translate API for comments)
- Auth provider credentials: (Optional - Facebook, Twitter, OIDC, etc.)

### Step 6: Run Database Migrations

After the server is deployed:

1. Go to **polis-server** service in Render dashboard
2. Click **"Shell"** tab
3. Run migrations:

```bash
npm run migrations:up
```

---

## 🔗 Connecting Services Together

### Service URLs

After deployment, Render will provide URLs for each service. **Note: The URLs below are examples only - your actual URLs will be different based on your service names.**

- Server: `https://polis-server.onrender.com`
- Math: `https://polis-math.onrender.com`
- Client Participation: `https://polis-client-participation.onrender.com`
- etc.

### Update Environment Variables with Service URLs

Go back to **polis-server** and add (replace with your actual service URLs):

```
STATIC_FILES_DOMAIN=https://polis-client-participation.onrender.com
STATIC_FILES_ADMIN_DOMAIN=https://polis-client-admin.onrender.com
STATIC_FILES_REPORT_DOMAIN=https://polis-client-report.onrender.com
MATH_URL=https://polis-math.onrender.com
```

---

## 🌍 Testing Your PT-PT Translation

After deployment, test your Portuguese (Portugal) translation. **Note: Replace the example URLs below with your actual service URLs.**

### Method 1: URL Parameter
```
https://your-polis-client-participation.onrender.com/[conversation-id]?ui_lang=pt-PT
```

### Method 2: Browser Language
1. Set your browser language to Portuguese (Portugal)
2. Visit your Polis instance
3. It should automatically load in PT-PT

### Method 3: Verify Translation File
```bash
curl https://your-polis-client-participation.onrender.com/js/strings/pt_pt.js
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
- Or use full Render URLs: `https://your-polis-server.onrender.com`
- Check environment variables point to correct service URLs

---

## 🔐 Security Checklist

Before going to production:

- [ ] All secrets stored as environment variables (not in code)
- [ ] JWT keys generated and configured
- [ ] Session secret generated and set
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

**Note: These are example URLs - use your actual service URLs from the Render dashboard.**

- **Main site**: `https://your-polis-client-participation.onrender.com`
- **Admin panel**: `https://your-polis-client-admin.onrender.com`
- **API**: `https://your-polis-server.onrender.com`
- **PT-PT Test**: `https://your-polis-client-participation.onrender.com/createuser?ui_lang=pt-PT`

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
