# Quick Deploy to Render.com - PT-PT Translation Ready! 🇵🇹

Your Portuguese (Portugal) translation is already merged into the `edge` branch and ready to deploy!

## 🚀 Fastest Path to Deployment

### Option A: One-Click Blueprint (5 minutes)

1. **Create `render.yaml` in your repository root** (use the file from RENDER_DEPLOYMENT_GUIDE.md)

2. **Push to your repository**:
   ```bash
   git checkout edge
   git add render.yaml
   git commit -m "Add Render.com deployment blueprint"
   git push origin edge
   ```

3. **Deploy in Render Dashboard**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **New +** → **Blueprint**
   - Select your repository
   - Choose branch: **edge**
   - Click **Apply**

4. **Set secrets** (in Render dashboard after deployment):
   - Generate JWT keys:
     ```bash
     openssl genrsa -out jwt-private.pem 4096
     openssl rsa -in jwt-private.pem -pubout -out jwt-public.pem
     ```
   - Generate session secret:
     ```bash
     openssl rand -hex 32
     ```
   - Add to polis-server environment in Render dashboard:
     - `JWT_PRIVATE_KEY`: contents of `jwt-private.pem`
     - `JWT_PUBLIC_KEY`: contents of `jwt-public.pem`
     - `SESSION_SECRET`: output from `openssl rand -hex 32`

5. **Run migrations**:
   - Open polis-server shell in Render
   - Run: `npm run migrations:up`

6. **Test PT-PT translation**:
   ```
   https://your-polis-url.onrender.com/createuser?ui_lang=pt-PT
   ```

---

## 🎯 Minimal Deployment (Just the Essentials)

If you want to start small and add services later:

### 1. PostgreSQL Database
- **New +** → **PostgreSQL**
- Name: `polis-db`
- Click **Create**
- Copy the **Internal Connection String**

### 2. Server (Backend API)
- **New +** → **Web Service**
- Repository: Your Polis repo
- Branch: **edge** ✅ (has PT-PT translation)
- Name: `polis-server`
- Runtime: **Docker**
- Dockerfile path: `./server/Dockerfile`
- Docker context: `./server`
- Environment:
  ```
  DATABASE_URL=[paste internal connection string]
  DATABASE_SSL=true
  NODE_ENV=production
  PORT=5000
  ```
- After deploy, run migrations in Shell tab: `npm run migrations:up`

### 3. Client Participation (Frontend with PT-PT!)
- **New +** → **Static Site**
- Repository: Your Polis repo
- Branch: **edge** ✅
- Name: `polis-client`
- Build command:
  ```bash
  cd client-participation && npm ci && npm run build:prod
  ```
- Publish directory: `client-participation/dist`

### 4. Math Service (Analytics)
- **New +** → **Web Service**
- Repository: Your Polis repo
- Branch: **edge**
- Name: `polis-math`
- Runtime: **Docker**
- Dockerfile path: `./math/Dockerfile`
- Docker context: `./math`
- Environment:
  ```
  DATABASE_URL=[same as server]
  MATH_ENV=prod
  ```

**That's it!** You now have a working Polis instance with PT-PT translation.

---

## 🧪 Testing Your Translation

Once deployed:

### Test URL with PT-PT
```
https://polis-client.onrender.com/[conversation-id]?ui_lang=pt-PT
```

### Verify Translation Files Deployed
```bash
curl https://polis-client.onrender.com/js/strings/pt_pt.js
```

You should see:
```javascript
s.agree = "Concordo";
s.disagree = "Discordo";
s.pass = "Passar / Não tenho a certeza";
s.writePrompt = "Partilhe a sua perspetiva...";
// etc.
```

### Browser Language Detection
1. Set browser to Portuguese (Portugal)
2. Visit your Polis site
3. Should load in PT-PT automatically!

---

## 🔄 Future Updates

When you make changes:

```bash
git checkout edge
# make your changes
git add .
git commit -m "Update xyz"
git push origin edge
```

Render auto-deploys on push to `edge` branch (if Auto-Deploy is enabled).

---

## 💡 Pro Tips

### Connect Services Together

After all services are running, update `polis-server` environment variables:

```
# Internal URLs (faster, free bandwidth within Render)
MATH_URL=http://polis-math:10000
```

Or use external URLs:
```
MATH_URL=https://polis-math.onrender.com
```

### Custom Domain

In Render dashboard:
1. Go to `polis-client` service
2. Settings → **Custom Domain**
3. Add your domain: `polis.yoursite.com`
4. Update DNS as instructed
5. SSL auto-provisions ✅

### Scale Up

Need more power? In service settings:
- **Starter** ($7/mo): 512MB RAM, 0.5 CPU
- **Standard** ($25/mo): 2GB RAM, 1 CPU
- **Pro** ($85/mo): 4GB RAM, 2 CPU

### Monitor Costs

Free tier includes:
- 750 hours/month of web services (expires after 90 days)
- Static sites are FREE forever
- Database requires paid plan ($7+/month)

**Tip**: Use Render's cost calculator to estimate your monthly bill.

---

## 🎊 What You've Accomplished

✅ Portuguese (Portugal) translation merged to `edge`
✅ Ready to deploy to Render.com
✅ All 80+ UI strings translated
✅ E2E tests included
✅ Browser language detection enabled
✅ URL parameter support (`?ui_lang=pt-PT`)

Your Polis instance will serve Portuguese speakers from Portugal, Angola, Mozambique, and other lusophone countries with proper European Portuguese! 🇵🇹 🇦🇴 🇲🇿

---

**Need the full guide?** See `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions.

**Questions?** Check [Render Docs](https://render.com/docs) or [Polis Community](https://github.com/compdemocracy/polis/discussions)
