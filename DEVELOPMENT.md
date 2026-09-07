# MediCare - Development Guide

## 🚀 Getting Started with Development

This guide covers development workflows, best practices, and debugging tips for MediCare.

## 📝 Development Workflow

### Starting Development Environment

```bash
# Terminal 1 - Start MongoDB
mongod

# Terminal 2 - Start Backend
cd server
npm install  # First time only
npm run dev

# Terminal 3 - Start Frontend
cd client
npm install  # First time only
npm run dev
```

### Development URLs
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **MongoDB:** mongodb://127.0.0.1:27017/medicare

## 🛠️ Common Development Tasks

### Adding a New API Endpoint

1. **Create Route** in `server/routes/newRoutes.js`:
```javascript
const express = require('express');
const router = express.Router();
const { getResource, createResource } = require('../controllers/newController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getResource);
router.post('/', protect, createResource);

module.exports = router;
```

2. **Create Controller** in `server/controllers/newController.js`:
```javascript
const { successResponse, errorResponse } = require('../utils/helpers');

exports.getResource = async (req, res, next) => {
  try {
    // Implementation
    res.status(200).json(successResponse(data, 'Resource retrieved'));
  } catch (error) {
    next(error); // Pass to error handler
  }
};
```

3. **Create Model** in `server/models/Resource.js`:
```javascript
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // other fields
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
```

4. **Register Route** in `server/server.js`:
```javascript
app.use('/api/resource', require('./routes/newRoutes'));
```

### Creating a New React Component

1. **Create Component** in `client/src/components/ComponentName.jsx`:
```jsx
import { useState, useEffect } from 'react';
import API from '../services/api';

const ComponentName = ({ prop1, prop2 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await API.get('/endpoint');
      setData(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

2. **Use in Page**:
```jsx
import ComponentName from '../components/ComponentName';

function HomePage() {
  return <ComponentName prop1="value" />;
}
```

## 🧪 Testing Endpoints

### Using cURL
```bash
# Get request
curl http://localhost:5000/api/doctors

# Post request with data
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Protected endpoint with token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/appointments
```

### Using Postman
1. Create new request
2. Set method (GET, POST, etc.)
3. Enter URL: `http://localhost:5000/api/endpoint`
4. Add Headers:
   ```
   Content-Type: application/json
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
5. Add body (for POST/PUT)
6. Send request

### Using VS Code REST Client Extension
Create `requests.http` file:
```http
### Get all doctors
GET http://localhost:5000/api/doctors

### Login user
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "patient@medicare.com",
  "password": "patient123"
}

### Get protected endpoint
GET http://localhost:5000/api/appointments
Authorization: Bearer YOUR_TOKEN_HERE
```

## 🐛 Debugging

### Backend Debugging

1. **Using Console Logs:**
```javascript
console.log('Debug info:', variable);
console.error('Error:', error);
```

2. **Using Node Inspector:**
```bash
# Start server with debugger
node --inspect server.js

# Then open chrome://inspect in Chrome
```

3. **Using VS Code Debugger:**

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "program": "${workspaceFolder}/server/server.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

### Frontend Debugging

1. **React DevTools:**
   - Install [React DevTools](https://chrome.google.com/webstore) extension
   - Inspect components and state in browser console

2. **Redux DevTools** (if using Redux):
   - Install extension to view state changes

3. **Network Tab:**
   - Open DevTools → Network tab
   - See all API calls, request/response headers
   - Check status codes and payloads

## 📊 Database Operations

### Viewing Data in MongoDB

```bash
# Connect to MongoDB
mongosh

# Select database
use medicare

# View collections
show collections

# Query data
db.users.find()
db.doctors.find()
db.appointments.find()

# Count documents
db.users.count()

# Clear collection (careful!)
db.users.deleteMany({})

# Drop collection
db.users.drop()
```

### Seeding Database

```bash
# Run seed script
cd server
npm run seed
```

This creates demo users:
- patient@medicare.com / patient123
- sarah.jenkins@medicare.com / doctor123
- admin@medicare.com / admin123

## 📦 Adding Dependencies

### Backend
```bash
cd server
npm install package-name
# For dev dependencies
npm install --save-dev package-name
```

### Frontend
```bash
cd client
npm install package-name
```

## 🔍 Code Quality

### Linting
```bash
cd client
npm run lint
```

### Code Organization Tips
1. Keep components small and focused
2. Use meaningful variable names
3. Add comments for complex logic
4. Use error boundaries for error handling
5. Follow consistent code formatting

## 🚀 Hot Module Replacement (HMR)

Frontend automatically reloads on code changes:
- Vite provides Fast Refresh
- Component state is preserved
- Styles update instantly

Backend uses nodemon:
- Auto-restarts on file changes
- Can be customized in `nodemon.json`

## 📱 Mobile Testing

### Capacitor Testing
```bash
cd client

# Build web
npm run build

# Sync to native projects
npx cap sync

# Run on Android
npx cap open android

# Run on iOS
npx cap open ios
```

## 🔑 Environment Variable Best Practices

1. **Never commit .env files** (use .env.example instead)
2. **Use meaningful names:**
   ```
   Good: VITE_API_URL, MONGO_URI, JWT_SECRET
   Bad: API, DB, SECRET
   ```
3. **Document all variables** in setup guide
4. **Use different values** for dev/staging/production
5. **Keep secrets secure** - never share production values

## 🎯 Common Development Patterns

### Handling API Errors
```javascript
try {
  const response = await API.get('/endpoint');
  setData(response.data.data);
} catch (error) {
  if (error.response?.status === 401) {
    // Handle unauthorized
    navigate('/login');
  } else if (error.response?.status === 404) {
    // Handle not found
    setError('Resource not found');
  } else {
    // Handle other errors
    setError(error.message);
  }
}
```

### Form Validation
```javascript
const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.email) errors.email = 'Email required';
  if (!formData.password) errors.password = 'Password required';
  if (formData.password.length < 6) {
    errors.password = 'Password must be 6+ characters';
  }
  
  return errors;
};
```

### Protected Routes
```javascript
import ProtectedRoute from '../components/ProtectedRoute';

<Routes>
  <Route path="/" element={<Home />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
</Routes>
```

## 📚 Useful Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/)

## 🆘 Troubleshooting Common Issues

### "Cannot find module" Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Find process using port (Windows PowerShell)
Get-Process | Where-Object {$_.ProcessName -eq "node"}

# Find process using port (Mac/Linux)
lsof -i :5000

# Kill process
kill -9 PID
```

### CORS Error
- Check `CLIENT_URL` in server `.env`
- Ensure correct origin in CORS middleware
- Frontend and backend must be on compatible origins

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network connectivity

### Hot Reload Not Working
- Check if Vite server is running
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

## 🎓 Learning Resources

- Study existing components and controllers
- Read error messages carefully (they're helpful!)
- Use browser DevTools to inspect state
- Keep database backups before major changes
- Use version control (git) to track changes

---

Happy coding! 🚀
