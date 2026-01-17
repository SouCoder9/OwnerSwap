# OwnerSwap FREE Deployment Guide

## 100% FREE Deployment Stack
- **Backend**: Render (Free tier - 750 hours/month)
- **Frontend**: Vercel (Free tier - Unlimited)
- **Database**: MongoDB Atlas (Free tier - 512MB)
- **Images**: Cloudinary (Free tier - 25GB)

## Alternative FREE Options:
- **Backend**: Cyclic, Railway (hobby), Heroku (with GitHub Student)
- **Frontend**: Netlify, GitHub Pages

## Step 1: MongoDB Atlas Setup
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create cluster (M0 Sandbox - FREE)
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ownerswap`

## Step 2: Cloudinary Setup
1. Go to https://cloudinary.com
2. Create free account
3. Get: Cloud Name, API Key, API Secret

## Step 3: Backend Deployment (Render - FREE)
1. Go to https://render.com
2. Connect GitHub repo
3. Create "Web Service"
4. Select backend folder
5. Add environment variables

## Step 4: Frontend Deployment (Vercel - FREE)
1. Go to https://vercel.com
2. Connect GitHub repo
3. Deploy frontend folder
4. Add environment variables

## Environment Variables Needed:
### Backend (.env):
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-32-char-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

### Frontend (.env):
```
VITE_API_URL=https://your-railway-app.railway.app/api
```