# Deployment Ready Checklist

## Required setup before hosting

### Frontend
- Push the client folder to GitHub
- In Vercel, import the client project
- Set the build command to `npm run build`
- Set the output directory to `dist`
- Add `VITE_API_URL` from the deployed backend URL

### Backend
- Push the server folder to GitHub
- In Render, create a new Web Service
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables from the `.env.example` file

### Database
- Create a MongoDB Atlas cluster
- Add the connection string to `MONGO_URI`

### Production API URL
- Replace localhost in the frontend with the deployed backend base URL
- Example: `https://medicare-api.onrender.com/api`

### CORS
- Add the live frontend URL to `CLIENT_URL` in the backend environment
- Example: `https://medicare-client.vercel.app`

### Final test
- Visit the frontend URL
- Register/login and verify API calls work
- Make sure all payment and profile actions use the live backend
