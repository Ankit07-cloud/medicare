# MediCare - Quick Reference Guide

A handy reference for commonly used commands and patterns.

## 🚀 Quick Start Commands

### Start Development Environment
```bash
# Terminal 1: Database
mongod

# Terminal 2: Backend
cd server && npm run dev

# Terminal 3: Frontend  
cd client && npm run dev

# Access Application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

### Build for Production
```bash
# Backend: Already production-ready
cd server

# Frontend: Build optimized bundle
cd client
npm run build  # Creates dist/ folder
npm run preview  # Preview production build
```

---

## 📁 File Structure Quick Reference

```
Medical/
├── Documentation (Start here!)
│   ├── README.md                    # Project overview
│   ├── SETUP.md                     # Installation guide
│   ├── ARCHITECTURE.md              # Technical details
│   ├── DEVELOPMENT.md               # Dev workflow
│   ├── DEPLOYMENT.md                # Production deployment
│   ├── API_DOCUMENTATION.md         # API reference
│   ├── FRAMEWORK_SETUP.md           # What was setup
│   └── PRODUCTION_CHECKLIST.md      # Before going live
│
├── client/                          # React Frontend
│   ├── .env.local                   # Configuration (create this!)
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   ├── context/                 # Global state
│   │   ├── services/api.js          # API client
│   │   ├── App.jsx                  # Root component
│   │   └── main.jsx                 # Entry point
│   └── package.json
│
└── server/                          # Express Backend
    ├── .env                         # Configuration (created!)
    ├── .env.example                 # Template
    ├── server.js                    # Entry point
    ├── config/db.js                 # Database connection
    ├── controllers/                 # Business logic
    ├── middleware/                  # Custom middleware
    ├── models/                      # Database schemas
    ├── routes/                      # API endpoints
    ├── utils/                       # Helper functions
    └── package.json
```

---

## 🔧 Common Server Commands

### Development
```bash
cd server

# Install dependencies
npm install

# Start server with auto-reload
npm run dev

# Start server (production mode)
npm start

# Seed database with demo data
npm run seed

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix
```

---

## 🎨 Common Frontend Commands

### Development
```bash
cd client

# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter/code checker
npm run lint

# Format code
npm run lint --fix  # if available
```

---

## 🗄️ MongoDB/Database Commands

### Using MongoDB CLI
```bash
# Connect to MongoDB
mongosh

# Select database
use medicare

# View all collections
show collections

# View documents
db.users.find()           # All users
db.doctors.find()         # All doctors
db.appointments.find()    # All appointments

# Count documents
db.users.count()

# Find specific document
db.users.findOne({ email: "patient@medicare.com" })

# Update document
db.users.updateOne(
  { email: "patient@medicare.com" },
  { $set: { phone: "1234567890" } }
)

# Delete document
db.users.deleteOne({ email: "test@example.com" })

# Clear collection
db.users.deleteMany({})

# Drop collection
db.users.drop()

# Exit MongoDB
exit
```

### Backup & Restore
```bash
# Backup all databases
mongodump --out ./backup/

# Restore database
mongorestore ./backup/

# Backup single database
mongodump --db medicare --out ./backup/

# Export as JSON
mongoexport --db medicare --collection users --out users.json

# Import from JSON
mongoimport --db medicare --collection users --file users.json
```

---

## 🔐 Authentication & Testing

### Demo Credentials
```
Patient:  patient@medicare.com / patient123
Doctor:   sarah.jenkins@medicare.com / doctor123
Admin:    admin@medicare.com / admin123
```

### Generate JWT Token (for manual testing)
```javascript
// Run in Node REPL or browser console
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { id: 'user_id', email: 'user@example.com' },
  'your_jwt_secret',
  { expiresIn: '7d' }
);
console.log(token);
```

### Test Protected Endpoint
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/appointments
```

---

## 📡 Common API Calls

### With cURL

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"pass123",
    "phone":"9876543210",
    "role":"patient"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"pass123"
  }'
```

#### Get Doctors
```bash
curl http://localhost:5000/api/doctors
curl http://localhost:5000/api/doctors?specialization=Cardiology
```

#### Book Appointment (Protected)
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "doctorId":"507f1f77bcf86cd799439012",
    "appointmentDate":"2024-08-15",
    "appointmentTime":"10:00",
    "notes":"Checkup"
  }'
```

---

## 🐛 Debugging Techniques

### Backend Debugging
```javascript
// Add to any file for debugging
console.log('Variable:', variable);
console.error('Error:', error);

// Check environment
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check request data
router.post('/test', (req, res) => {
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  res.json({ ok: true });
});
```

### Frontend Debugging
```javascript
// Browser console
console.log('Data:', data);
console.error('Error:', error);

// React component
function MyComponent() {
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);
}

// Check API call
import API from '../services/api';
API.get('/endpoint')
  .then(res => console.log('Success:', res.data))
  .catch(err => console.error('Error:', err.message));
```

---

## 🚨 Common Issues & Fixes

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
Solution: Start MongoDB with: mongod
```

### Port Already in Use
```
Error: EADDRINUSE: address already in use :::5000
Solution: 
  # Windows PowerShell:
  Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
  
  # Mac/Linux:
  lsof -i :5000
  kill -9 <PID>
```

### CORS Error
```
Error: Cross-Origin Request Blocked
Solution: Check CLIENT_URL in server .env matches frontend URL
```

### Module Not Found
```
Error: Cannot find module
Solution: 
  npm install  # Install dependencies
  rm -rf node_modules  # Clear cache if needed
```

### API 404 Not Found
```
Solution: 
  1. Check endpoint URL spelling
  2. Verify server is running
  3. Check API_URL in client .env.local
```

---

## 📊 Performance Optimization

### Frontend
```javascript
// Lazy load components
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));

// Memoize expensive components
const MemoComponent = React.memo(Component);

// Debounce search
import { debounce } from 'lodash';
const handleSearch = debounce((value) => {
  // API call
}, 500);

// Use useCallback for functions
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### Backend
```javascript
// Add database indexes
userSchema.index({ email: 1 });
doctorSchema.index({ specialization: 1 });

// Cache responses
app.get('/doctors', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});

// Pagination
// Instead of: db.users.find()
// Use: db.users.find().skip((page-1)*limit).limit(limit)

// Select only needed fields
db.users.find({}, { name: 1, email: 1 })
```

---

## 📚 Useful Resources

- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- MongoDB Docs: https://docs.mongodb.com
- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com

---

## 🔄 Git Quick Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature/feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature/feature-name

# View commit history
git log --oneline
```

---

## 🚀 Deployment Quick Commands

### Heroku
```bash
heroku login
heroku create app-name
heroku config:set KEY=VALUE
git push heroku main
heroku logs --tail
```

### Vercel (Frontend)
```bash
npm install -g vercel
vercel

# Set environment variables
vercel env add VITE_API_URL
```

---

## 📋 Environment Variables Checklist

### Server (.env)
```
MONGO_URI=mongodb://127.0.0.1:27017/medicare
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-...
CLIENT_URL=http://localhost:5173
```

### Client (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=MediCare
VITE_ENABLE_PWA=true
```

---

## ⚡ Performance Benchmarks

Good Targets:
- Page load time: < 3 seconds
- API response time: < 500ms
- Bundle size: < 500KB (gzipped)
- Time to Interactive: < 5 seconds
- First Contentful Paint: < 1.5 seconds

---

## 📞 Quick Help

**Need help?**

1. Check documentation files:
   - SETUP.md - Installation issues
   - DEVELOPMENT.md - Development questions
   - DEPLOYMENT.md - Production issues
   - API_DOCUMENTATION.md - API endpoints

2. Debug steps:
   - Check error message in console
   - Look at network tab (DevTools)
   - Check server logs
   - Verify environment variables

3. Common fixes:
   - Restart server: Ctrl+C, then run again
   - Refresh browser: Ctrl+Shift+R (hard refresh)
   - Clear cache: npm cache clean --force

---

**Last Updated:** August 2024
**Quick Reference Version:** 1.0
