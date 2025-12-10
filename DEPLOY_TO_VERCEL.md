# Quick Vercel Deployment Guide

## Why Switch to Vercel?

Your Cloudflare deployment succeeded BUT these features don't work:
- ❌ Chatbot (`/api/chat`) - API routes not supported
- ❌ Blog dynamic pages - SSR not supported  
- ❌ Full middleware - Limited support

On Vercel, ALL features work out of the box! ✅

## Deploy to Vercel in 5 Minutes

### Step 1: Go to Vercel
Visit: https://vercel.com/

### Step 2: Sign In
- Click "Sign Up" or "Log In"
- Choose "Continue with GitHub"
- Authorize Vercel to access your GitHub

### Step 3: Import Project
1. Click "Add New..." → "Project"
2. Find and select: `SandeepaAthukorala/yaksen-website`
3. Click "Import"

### Step 4: Configure (Important!)
**Framework Preset**: Next.js (should auto-detect)
**Root Directory**: `./` (leave as default)
**Build Command**: `npm run build` (leave as default)
**Output Directory**: `.next` (leave as default)

### Step 5: Add Environment Variables
Click "Environment Variables" and add:

**Key**: `GEMINI_API_KEY`
**Value**: [Your Google Gemini API Key]

If you don't have the API key:
- Go to https://makersuite.google.com/app/apikey
- Create a new API key
- Copy and paste it

### Step 6: Deploy!
Click "Deploy"

Wait 2-3 minutes for deployment to complete.

### Step 7: Test Your Site
You'll get a URL like: `https://yaksen-website.vercel.app`

Test:
- ✅ Home page loads
- ✅ Both `/en/` and `/si/` routes work
- ✅ Service pages work
- ✅ **Chatbot works** (most important!)
- ✅ 3D animations work

### Step 8: Add Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your domain (e.g., `yaksen.lk`)
3. Update DNS records as instructed

---

## Comparison

| Feature | Cloudflare Pages | Vercel |
|---------|-----------------|--------|
| Static pages | ✅ Works | ✅ Works |
| API routes (chatbot) | ❌ No | ✅ **Yes** |
| SSR/Dynamic | ❌ Limited | ✅ **Yes** |
| Setup difficulty | Medium | ⭐ Easy |
| Custom domains | ✅ Yes | ✅ Yes |
| Free tier | Generous | **Very generous** |

---

## Current Status

- ✅ GitHub repo is ready: `SandeepaAthukorala/yaksen-website`
- ✅ Code builds successfully  
- ✅ All features work locally
- ⚠️ Cloudflare deployment works but missing features

**Next Step**: Deploy to Vercel for full functionality!

---

**Need help?** Just ask and I'll guide you through any step!
