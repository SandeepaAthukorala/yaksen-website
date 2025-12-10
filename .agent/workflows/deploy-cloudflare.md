---
description: Deploy the Yaksen website to production hosting
---

# Deploy Yaksen Website - Complete Guide

**⚠️ IMPORTANT**: Your site includes an AI chatbot with an API route (`/api/chat`). This affects which deployment platform you should use.

## Quick Decision Guide

| Platform | Chatbot Works? | Setup Difficulty | Cost | Recommendation |
|----------|---------------|------------------|------|----------------|
| **Vercel** | ✅ Yes | ⭐ Easy | Free | **✅ Recommended** |
| **Cloudflare Pages** | ❌ No (without extra work) | ⭐⭐ Medium | Free | Only if removing chatbot |

---

## Option 1: Deploy to Vercel (RECOMMENDED)

### Why Vercel?
- Built specifically for Next.js (same company)
- API routes work perfectly
- Zero configuration needed
- Generous free tier
- Automatic HTTPS, CDN, and previews

### Steps to Deploy on Vercel

#### 1. Remove Static Export Configuration
First, revert the `next.config.ts` to allow server-side features:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No 'output: export' - we need server features for API routes
  images: {
    // Vercel supports Next.js Image Optimization
    remotePatterns: [],
  },
};

export default nextConfig;
```

#### 2. Push to GitHub
Ensure all changes are committed:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### 3. Deploy via Vercel Dashboard

// turbo
1. Go to https://vercel.com/
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `yaksen-website`
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: Leave default (`next build`)
   - **Output Directory**: Leave default (`.next`)
5. Add environment variables (if any):
   - `GEMINI_API_KEY` - Your Google Gemini API key (for chatbot)
   - Any other env vars from your `.env.local`
6. Click "Deploy"

#### 4. Verify Deployment
- Visit the provided `.vercel.app` URL
- Test both language routes: `/en/` and `/si/`
- **Test the chatbot** to ensure it works
- Check all pages and animations

#### 5. Add Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your domain (e.g., `yaksen.lk`)
3. Follow DNS configuration instructions

### Vercel CLI Deployment (Alternative)

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy:
```bash
vercel
```

For production:
```bash
vercel --prod
```

---

## Option 2: Deploy to Cloudflare Pages (Static Only)

### ⚠️ Limitations
- **Chatbot will NOT work** (API routes not supported in static mode)
- You must remove or disable the chatbot first

### Steps if Choosing Cloudflare

#### 1. Remove or Disable Chatbot

Option A - Delete the API route:
```bash
Remove-Item -Path "src\app\api" -Recurse -Force
```

Option B - Comment out chatbot in your pages (keep for future):
- Remove chatbot component references from your pages
- Keep the API route code but don't deploy it

#### 2. Update next.config.ts for Static Export

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better routing on static hosts
};

export default nextConfig;
```

#### 3. Test Build Locally
```bash
npm run build
```

This creates an `out` directory with static files.

#### 4. Deploy to Cloudflare Pages

**Via Dashboard**:
1. Go to https://dash.cloudflare.com/
2. Click "Workers & Pages" → "Create application" → "Pages"
3. Connect to Git → Select `yaksen-website` repository
4. Configure:
   - **Framework**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. Click "Save and Deploy"

**Via Wrangler CLI**:
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy out --project-name=yaksen-website
```

#### 5. Verify Static Deployment
- Check `.pages.dev` URL
- Test all routes (chatbot should be gone)
- Verify i18n routing works

---

## Recommended Environment Variables

### For Vercel (with Chatbot):
```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
NODE_ENV=production
```

### For Cloudflare (Static):
No environment variables needed (no server-side code)

---

## Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Both `/en/` and `/si/` routes work
- [ ] Services pages render properly
- [ ] Projects/portfolio section displays
- [ ] Contact form works (if using)
- [ ] Chatbot works (Vercel only)
- [ ] 3D animations/Three.js canvas loads
- [ ] All images load
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS is enabled
- [ ] SEO meta tags are present

---

## Troubleshooting

### Build Fails with "Error: Page data not collected for /api/chat"
**Solution**: You're trying to use static export with API routes. Either:
1. Use Vercel (recommended)
2. Switch to Cloudflare Workers (advanced)
3. Remove the API route

### Images Not Loading
**Solution**: Ensure all images are in the `public` folder and paths are correct (`/images/...`)

### 404 on Page Routes
**Solution**: 
- For Vercel: Check your routes are properly defined
- For Cloudflare: Ensure `trailingSlash: true` in config

### Chatbot Doesn't Work on Vercel
**Solution**: 
1. Check environment variable `GEMINI_API_KEY` is set
2. Check API route is present in deployment
3. Check browser console for errors
4. Verify Gemini API quota/billing

---

## Performance Optimization

After deployment:

### Vercel:
- Enable Edge Functions (automatic)
- Configure caching headers
- Use Vercel Analytics (optional)

### Cloudflare:
-Enable Auto Minify (HTML, CSS, JS)
- Enable Brotli compression
- Configure cache rules
- Enable HTTP/3

---

## Continuous Deployment

Both platforms support automatic deployments:

- **Every push to `main`** → Automatic production deployment
- **Pull requests** → Preview deployments with unique URLs
- **Rollback** → Instant rollback to previous deployment

---

## My Recommendation for Yaksen

**Use Vercel** because:
1. ✅ Your chatbot is a key feature - keep it!
2. ✅ Zero configuration - just works
3. ✅ Free hobby plan is very generous
4. ✅ Best Next.js support
5. ✅ Easy team collaboration
6. ✅ Great developer experience

If you decide to remove the chatbot later, you can always migrate to Cloudflare Pages for pure static hosting.

---

**Need help?** Let me know which platform you'd like to use and I'll guide you through the specific steps!
