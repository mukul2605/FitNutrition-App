# Render Deployment Guide

## Prerequisites
- MongoDB Atlas account (for production database)
- Render account

## Deployment Steps

### 1. Database Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Whitelist Render's IP addresses (or use 0.0.0.0/0 for all IPs)

### 2. Backend Deployment
1. Connect your GitHub repo to Render
2. Create a new Web Service
3. Use these settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
   - **Plan**: Free (or paid for better performance)

4. Add environment variables in Render dashboard:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (use a password generator)
   - `FRONTEND_URL`: Your frontend URL (will get this after frontend deployment)

### 3. Frontend Deployment
1. Create a new Static Site in Render
2. Use these settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

3. Update the API configuration:
   - Replace `your-backend-url.onrender.com` in `frontend/src/config/api.js` with your actual backend URL

### 4. Update CORS Configuration
After both services are deployed:
1. Update the `FRONTEND_URL` environment variable in your backend service
2. The backend will automatically allow requests from your frontend domain

## Important Notes

- Free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30+ seconds
- Consider upgrading to paid plans for production apps
- Monitor your MongoDB Atlas usage to avoid overages

## Troubleshooting

### Common Issues:
1. **CORS errors**: Ensure FRONTEND_URL is set correctly in backend
2. **Database connection**: Check MongoDB Atlas IP whitelist and connection string
3. **Build failures**: Check Node.js version compatibility
4. **API calls failing**: Verify the API base URL in frontend config

### Logs:
- Check Render service logs for detailed error messages
- MongoDB Atlas provides connection logs