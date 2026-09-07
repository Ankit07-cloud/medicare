# MediCare - Deployment Guide

Complete guide for deploying MediCare to production environments.

## 🚀 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Dependencies updated to stable versions
- [ ] Code reviewed and committed to git
- [ ] SSL certificates ready
- [ ] API documentation updated
- [ ] Monitoring and logging configured

## 📦 Backend Deployment

### Option 1: Deploy to Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

1. **Initialize Git (if not already done):**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create Heroku app:**
```bash
heroku login
heroku create medicare-api-prod
```

3. **Add MongoDB Atlas (Free Tier):**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string

4. **Set environment variables:**
```bash
heroku config:set MONGO_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_production_secret_key
heroku config:set NODE_ENV=production
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set CLIENT_URL=https://your-frontend-url.com
heroku config:set PORT=5000
```

5. **Create Procfile** in root:
```
web: cd server && npm install && npm start
```

6. **Deploy:**
```bash
git push heroku main
```

7. **View logs:**
```bash
heroku logs --tail
```

### Option 2: Deploy to Railway

#### Steps

1. **Push code to GitHub**

2. **Go to [Railway.app](https://railway.app)**

3. **Create new project:**
   - Click "New Project"
   - Select "GitHub Repo"
   - Authorize and select your repo

4. **Add MongoDB:**
   - Click "Add Services"
   - Select "MongoDB"

5. **Configure environment:**
   - Click on your app
   - Go to "Variables"
   - Add environment variables (same as Heroku)

6. **Deploy:**
   - Railway auto-deploys on git push
   - View logs in dashboard

### Option 3: Deploy to Render

#### Steps

1. **Go to [Render.com](https://render.com)**

2. **Create new Web Service:**
   - Connect GitHub account
   - Select repository
   - Select branch to deploy

3. **Configure:**
   - **Name:** medicare-api
   - **Root Directory:** server
   - **Build Command:** npm install
   - **Start Command:** npm start
   - **Environment:** Node

4. **Add environment variables:**
   - Click "Environment"
   - Add all variables from `.env`

5. **Add MongoDB:**
   - Render Web Services section
   - Add MongoDB connection string

6. **Deploy:**
   - Render auto-deploys
   - Monitor logs in dashboard

### Option 4: Deploy to AWS EC2

#### Prerequisites
- AWS account
- EC2 instance (Ubuntu 20.04 or later)
- SSH key pair

#### Steps

1. **Connect to EC2:**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

2. **Install dependencies:**
```bash
sudo yum update -y
sudo yum install nodejs -y
sudo yum install npm -y
```

3. **Install MongoDB (or use MongoDB Atlas):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo rpm --import -
echo "[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc" | sudo tee /etc/yum.repos.d/mongodb-org-5.0.repo
sudo yum install -y mongodb-org
sudo systemctl start mongod
```

4. **Clone repository:**
```bash
git clone https://github.com/your-username/medicare.git
cd medicare/server
npm install
```

5. **Create `.env` file:**
```bash
nano .env
# Add your production environment variables
```

6. **Install PM2 (process manager):**
```bash
sudo npm install -g pm2
pm2 start server.js --name "medicare-api"
pm2 startup
pm2 save
```

7. **Install Nginx (reverse proxy):**
```bash
sudo yum install nginx -y
sudo systemctl start nginx
```

8. **Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable SSL with Let's Encrypt:**
```bash
sudo yum install certbot python-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## 📱 Frontend Deployment

### Option 1: Deploy to Vercel

#### Steps

1. **Push code to GitHub**

2. **Go to [Vercel.com](https://vercel.com)**

3. **Import project:**
   - Click "New Project"
   - Select your GitHub repo
   - Select "client" folder as root

4. **Configure:**
   - **Framework:** Vite
   - **Build Command:** npm run build
   - **Output Directory:** dist

5. **Add environment variables:**
   - Click "Environment Variables"
   - Add `VITE_API_URL=https://your-api-domain.com/api`

6. **Deploy:**
   - Vercel auto-deploys on push to main
   - Get custom domain in settings

### Option 2: Deploy to Netlify

#### Steps

1. **Build frontend:**
```bash
cd client
npm run build
```

2. **Go to [Netlify.com](https://netlify.com)**

3. **Deploy:**
   - Drag and drop `dist` folder
   - Or connect GitHub and auto-deploy

4. **Set environment variables:**
   - Go to Build & Deploy → Environment
   - Add `VITE_API_URL`

5. **Set up custom domain:**
   - Domain settings → Add custom domain
   - Configure DNS records

### Option 3: Deploy to GitHub Pages

#### Steps

1. **Update `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/medicare/', // if deploying to github.com/username/medicare
  // ... rest of config
});
```

2. **Add deploy script to `package.json`:**
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

4. **Deploy:**
```bash
npm run deploy
```

## 🔐 Production Best Practices

### Environment Variables
```env
# Never hardcode secrets
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/medicare
JWT_SECRET=use_a_very_long_random_string_here
OPENAI_API_KEY=sk-...
CLIENT_URL=https://your-frontend.com

# Additional security
CORS_ORIGIN=https://your-frontend.com
LOG_LEVEL=info
```

### Security Headers

Add to Nginx/Express:
```javascript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

### Database Backups
- Enable automated backups on MongoDB Atlas
- Test restore procedures regularly
- Keep backups in multiple regions

### Monitoring
- Set up error tracking (Sentry, New Relic)
- Monitor API response times
- Track database performance
- Set up alerts for issues

### Logging
- Use production-grade logging (Winston, Morgan)
- Store logs centrally (CloudWatch, LogRocket)
- Monitor logs for errors and warnings

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd server && npm install
      - run: cd server && npm test
      - run: cd client && npm install
      - run: cd client && npm run lint

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: git push https://heroku.com/medicare-api.git main

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 📊 Performance Optimization

### Backend
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Enable caching
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});

// Database indexing
// Add indexes to frequently queried fields in MongoDB
```

### Frontend
```javascript
// Code splitting
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));

// Optimize images
// Use WebP format with fallbacks

// Lazy load images
<img loading="lazy" src="..." />

// Tree shaking
// Unused code is removed in build
```

## 🚨 Troubleshooting Production Issues

### Application Won't Start
1. Check environment variables
2. Verify database connection
3. Check server logs
4. Ensure all dependencies installed

### High Memory Usage
1. Monitor with `pm2 monit`
2. Check for memory leaks
3. Enable garbage collection logging
4. Scale horizontally if needed

### Slow API Responses
1. Enable database query logging
2. Add indexes to queries
3. Implement caching
4. Monitor with New Relic/DataDog

### CORS Errors in Production
1. Update `CLIENT_URL` in .env
2. Verify frontend domain
3. Check CORS middleware configuration
4. Clear browser cache

## 📈 Scaling Strategy

### Horizontal Scaling
```bash
# Use load balancer (Nginx)
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Use database indexes
- Implement caching layer (Redis)

### Database Scaling
- Enable MongoDB sharding
- Use read replicas
- Implement connection pooling

## 🎯 Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify database connectivity
- [ ] Check frontend loads correctly
- [ ] Test authentication flow
- [ ] Verify SSL certificate
- [ ] Monitor error logs
- [ ] Set up automated backups
- [ ] Enable monitoring/alerts
- [ ] Document deployment process
- [ ] Set up rollback procedure

## 📞 Support & Monitoring Services

- **Error Tracking:** Sentry, Rollbar
- **Performance:** New Relic, DataDog
- **Logging:** LogRocket, Papertrail
- **Uptime Monitoring:** UptimeRobot, StatusPage
- **Security:** Snyk, OWASP

---

For more help, refer to hosting provider documentation or contact support.
