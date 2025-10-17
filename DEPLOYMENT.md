# 🚀 Deployment Guide - CanIBunk

This guide will help you deploy the CanIBunk application to production using Render (backend) and Netlify/Vercel (frontend).

---

## 📋 Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (free tier available)
- Render account (free tier available)
- Netlify or Vercel account (free tier available)

---

## 🗄️ Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier)
3. Create a database user with username and password
4. Whitelist all IP addresses (0.0.0.0/0) for Render to connect
5. Get your connection string - should look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

---

## 🔧 Step 2: Deploy Backend to Render

### A. Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** canibunk-backend (or your choice)
   - **Region:** Choose closest to your users
   - **Branch:** main
   - **Root Directory:** Leave empty (or specify if nested)
   - **Runtime:** Node
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### B. Set Environment Variables
In Render dashboard, add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `PORT` | `7000` | Or any port (Render will use their own) |
| `MONGO_URI` | `your-mongodb-connection-string` | From Step 1 |
| `JWT_SECRET_KEY` | `your-secure-random-string` | Generate with: `openssl rand -base64 32` |
| `FRONTEND_URL` | `https://your-app.netlify.app` | **⚠️ SET THIS AFTER STEP 3** |
| `NODE_VERSION` | `18` | Optional: Specify Node.js version |

### C. Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete (~5-10 minutes)
3. Note your backend URL: `https://canibunk.onrender.com` (or your chosen name)

---

## 🌐 Step 3: Deploy Frontend to Netlify

### A. Prepare for Deployment
Your frontend already has the correct production API URL (`https://canibunk.onrender.com`), so no code changes needed!

### B. Deploy to Netlify
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`

5. Click "Deploy site"
6. Wait for deployment (~2-3 minutes)
7. Note your frontend URL: `https://your-app.netlify.app`

### C. Configure Custom Domain (Optional)
1. In Netlify, go to "Domain settings"
2. Add your custom domain
3. Update DNS records as instructed

---

## 🔄 Step 4: Update FRONTEND_URL in Render

**⚠️ CRITICAL STEP - Don't skip this!**

1. Go back to your Render dashboard
2. Navigate to your backend web service
3. Go to "Environment" section
4. Update `FRONTEND_URL` to your actual frontend URL:
   ```
   https://your-app.netlify.app
   ```
   (without trailing slash)
5. Save changes - Render will automatically redeploy

---

## ✅ Step 5: Verify Deployment

### Test Backend
Visit: `https://canibunk.onrender.com/v1/user/checkLogin`
- Should return JSON (not error page)

### Test Frontend
1. Visit your Netlify URL
2. Try to sign up → Should work without CORS errors
3. Try to login → Should redirect to dashboard
4. Add a subject → Should save successfully
5. Add a lecture → Should update attendance

---

## 🐛 Troubleshooting

### CORS Errors
**Problem:** "Access to fetch has been blocked by CORS policy"

**Solution:**
- Verify `FRONTEND_URL` in Render matches your exact Netlify URL
- No trailing slash in `FRONTEND_URL`
- Redeploy Render after changing environment variables

### Database Connection Failed
**Problem:** Backend logs show "MongoServerError"

**Solution:**
- Check MongoDB Atlas whitelist includes 0.0.0.0/0
- Verify `MONGO_URI` is correct and includes password
- Check database user has read/write permissions

### 404 on Page Refresh
**Problem:** Refreshing any page except home gives 404

**Solution:**
- Verify `_redirects` file exists in `frontend/public/`
- Should contain: `/*    /index.html   200`

### Backend Cold Starts (Render Free Tier)
**Problem:** First request after inactivity takes 30+ seconds

**Explanation:** Render free tier spins down after 15 minutes of inactivity

**Solutions:**
- Upgrade to paid tier ($7/month) for always-on
- Use cron job to ping server every 14 minutes (e.g., cron-job.org)

---

## 🔒 Security Checklist

- [ ] Changed JWT_SECRET_KEY from example value
- [ ] MongoDB user has strong password
- [ ] FRONTEND_URL set to actual frontend domain
- [ ] No sensitive data in GitHub repository
- [ ] `.env` file is in `.gitignore`
- [ ] Database whitelist is appropriate (0.0.0.0/0 or specific IPs)

---

## 🎯 Performance Tips

1. **Enable Compression:** Already configured in Express with `compression` middleware
2. **MongoDB Indexes:** Add indexes on frequently queried fields
3. **Caching:** Consider Redis for session management (upgrade)
4. **CDN:** Netlify includes CDN by default

---

## 📝 Updating the Application

### Update Backend
1. Push changes to GitHub
2. Render auto-deploys from main branch

### Update Frontend
1. Push changes to GitHub
2. Netlify auto-deploys from main branch

### Manual Redeploy
- **Render:** Dashboard → "Manual Deploy" → "Deploy latest commit"
- **Netlify:** Dashboard → "Deploys" → "Trigger deploy"

---

## 🆘 Support & Resources

- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com/

---

## 📊 Environment Variables Summary

### Backend (.env on Render)
```env
PORT=7000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET_KEY=your_secret_key_here
FRONTEND_URL=https://your-app.netlify.app
```

### Frontend (No .env needed)
All API calls point to: `https://canibunk.onrender.com`

---

## ✨ You're Done!

Your CanIBunk application is now live! 🎉

- **Frontend:** https://your-app.netlify.app
- **Backend:** https://canibunk.onrender.com
- **Database:** MongoDB Atlas

Share your app and start tracking attendance! 📚✨
