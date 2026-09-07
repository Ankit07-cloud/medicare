# MediCare - Quick Start Guide

Welcome to MediCare! This guide will help you set up and run the application locally.

## 📋 Prerequisites

Before you start, make sure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation & Setup

### Step 1: Clone/Navigate to Project
```bash
cd Medical  # Navigate to the project directory
```

### Step 2: Backend Setup (Server)

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - The `.env` file has been created in the server directory
   - Edit `server/.env` and add your configuration:
     ```env
     MONGO_URI=mongodb://127.0.0.1:27017/medicare
     PORT=5000
     NODE_ENV=development
     JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
     JWT_EXPIRE=7d
     OPENAI_API_KEY=your_openai_api_key_here
     CLIENT_URL=http://localhost:5173
     ```

4. **Start MongoDB:**
   
   **On Windows:**
   ```bash
   # If MongoDB is installed, run:
   mongod
   ```
   
   **On macOS/Linux:**
   ```bash
   brew services start mongodb-community
   ```

5. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # OR Production mode
   npm start
   ```

   You should see:
   ```
   MongoDB Connected: 127.0.0.1:27017
   MediCare Server active on http://localhost:5000
   ```

### Step 3: Frontend Setup (Client)

1. **Navigate to client directory (in a new terminal):**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - The `.env.local` file has been created in the client directory
   - Edit `client/.env.local`:
     ```env
     VITE_API_URL=http://localhost:5000/api
     VITE_APP_NAME=MediCare
     VITE_ENABLE_PWA=true
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Local: http://localhost:5173/
   ```

## 🔑 Demo Login Credentials

Test the application with these credentials:

| Role | Email | Password |
|---|---|---|
| **Patient** | patient@medicare.com | patient123 |
| **Doctor** | sarah.jenkins@medicare.com | doctor123 |
| **Admin** | admin@medicare.com | admin123 |

## 📱 Features Overview

### Public Pages
- **Home** - Hero section, services showcase, doctor highlights
- **Doctors** - Browse and book appointments with doctors
- **Pharmacy** - Order medicines online
- **Lab Tests** - Book diagnostic tests
- **Blog** - Health articles and tips
- **About** - Hospital information
- **Contact** - Get in touch

### Patient Dashboard
- View upcoming appointments
- Track appointment status
- View prescriptions
- Manage health profile

### Doctor Dashboard
- Manage patient consultations
- Approve/reject appointments
- Write prescriptions
- Update profile

### Admin Dashboard
- Hospital metrics overview
- Manage doctors, patients, medicines
- View all appointments
- Pharmacy inventory management

## 🔧 Available Scripts

### Server
```bash
npm run dev      # Development mode with nodemon
npm start        # Production mode
npm run seed     # Seed database with demo data
```

### Client
```bash
npm run dev      # Development server with Vite
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
Medical/
├── client/                 # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # Context API for state management
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── App.jsx        # Root component
│   ├── .env.local         # Environment configuration
│   └── package.json       # Dependencies
│
└── server/                # Express.js backend
    ├── config/            # Database configuration
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware
    ├── models/            # Mongoose schemas
    ├── routes/            # API routes
    ├── utils/             # Utility functions
    ├── .env               # Environment configuration
    ├── server.js          # Entry point
    └── package.json       # Dependencies
```

## 🛠️ Environment Variables Explained

### Server (.env)

| Variable | Purpose | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/medicare` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `JWT_SECRET` | Secret key for JWT tokens | Any long random string |
| `JWT_EXPIRE` | Token expiration time | `7d` |
| `OPENAI_API_KEY` | OpenAI API key for chatbot | From OpenAI dashboard |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |

### Client (.env.local)

| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `MediCare` |
| `VITE_ENABLE_PWA` | Enable PWA features | `true` |

## ⚠️ Troubleshooting

### MongoDB Connection Error
- **Issue:** `Error: connect ECONNREFUSED 127.0.0.1:27017`
- **Solution:** Make sure MongoDB is running. Start it with `mongod` command.

### Port Already in Use
- **Issue:** `Error: listen EADDRINUSE: address already in use :::5000`
- **Solution:** Change PORT in `.env` or kill the process using the port.

### CORS Errors
- **Issue:** `Cross-Origin Request Blocked`
- **Solution:** Make sure `CLIENT_URL` in server `.env` matches your frontend URL (usually `http://localhost:5173`).

### API Connection Failed
- **Issue:** Client can't connect to backend
- **Solution:** Ensure `VITE_API_URL` in client `.env.local` matches your server URL.

### Module Not Found Errors
- **Solution:** Run `npm install` in both server and client directories.

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Push code to GitHub
2. Set environment variables on hosting platform:
   ```
   MONGO_URI=your_production_mongodb_uri
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your_secure_random_string
   OPENAI_API_KEY=your_api_key
   CLIENT_URL=https://your-frontend-url.com
   ```
3. Deploy using the platform's dashboard

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-api.com/api
   ```
4. Deploy (auto-deploys on push to main)

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details

### Appointments
- `POST /api/appointments` - Book appointment (protected)
- `GET /api/appointments` - Get user appointments (protected)

### Medicines
- `GET /api/medicines` - List all medicines
- `POST /api/orders` - Place medicine order (protected)

### Admin
- `GET /api/admin/stats` - Get hospital stats (admin only)
- `POST /api/admin/doctors` - Add doctor (admin only)
- `POST /api/admin/medicines` - Add medicine (admin only)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review server logs and console errors
3. Check environment variables are correctly set
4. Ensure MongoDB is running
5. Verify API endpoints are accessible

---

**Happy coding! 🎉**
