# MediCare - Architecture & Best Practices

## 🏗️ Application Architecture

### Tech Stack
- **Frontend:** React 18 + Vite + Tailwind CSS + React Router + Axios
- **Backend:** Node.js + Express.js + MongoDB + Mongoose + JWT
- **Mobile:** Capacitor (iOS/Android support)
- **State Management:** React Context API
- **UI Components:** Custom components + Lucide Icons + Framer Motion

### Architecture Pattern
- **Frontend:** Component-based architecture with Context for state management
- **Backend:** MVC (Model-View-Controller) pattern with middleware-based request processing
- **Database:** Document-oriented MongoDB with Mongoose ODM

## 📦 Project Structure Breakdown

### Backend Structure

```
server/
├── config/
│   └── db.js              # Database connection with fallback to in-memory
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── doctorController.js
│   ├── appointmentController.js
│   ├── medicineController.js
│   ├── orderController.js
│   ├── adminController.js
│   └── chatController.js
├── middleware/
│   ├── authMiddleware.js      # JWT verification
│   ├── errorMiddleware.js     # Error handling
│   └── validationMiddleware.js # Request validation
├── models/
│   ├── User.js            # Patient/Doctor/Admin schema
│   ├── Doctor.js
│   ├── Appointment.js
│   ├── Medicine.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── doctorRoutes.js
│   ├── appointmentRoutes.js
│   ├── medicineRoutes.js
│   ├── orderRoutes.js
│   ├── adminRoutes.js
│   └── chatRoutes.js
├── utils/
│   └── generateToken.js   # JWT token generation
├── .env                   # Environment variables
├── server.js              # Entry point
└── package.json
```

### Frontend Structure

```
client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── MedicineCard.jsx
│   │   ├── AppointmentModal.jsx
│   │   ├── PaymentModal.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Chatbot.jsx
│   │   ├── HospitalMap.jsx
│   │   ├── Hero.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── // more components
│   ├── context/           # Global state management
│   │   ├── AuthContext.jsx    # User authentication state
│   │   ├── ThemeContext.jsx   # Dark/light mode
│   │   └── CartContext.jsx    # Shopping cart
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Doctors.jsx
│   │   ├── DoctorDetails.jsx
│   │   ├── DoctorReviews.jsx
│   │   ├── Pharmacy.jsx
│   │   ├── LabTests.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── doctor/        # Doctor dashboard pages
│   │   └── patient/       # Patient dashboard pages
│   ├── services/
│   │   └── api.js         # Axios instance with interceptors
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env.local             # Environment variables
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json
```

## 🔐 Authentication Flow

```
1. User Registration
   ↓
   POST /api/auth/register
   ↓
   [Server] Hash password with bcryptjs
   ↓
   [Server] Save user to MongoDB
   ↓
   Response: User data + JWT token

2. User Login
   ↓
   POST /api/auth/login
   ↓
   [Server] Verify email & password
   ↓
   [Server] Generate JWT token (7 days expiry)
   ↓
   [Client] Store token in localStorage
   ↓
   [Client] Add token to API headers via interceptor

3. Protected Routes
   ↓
   Request includes Authorization header
   ↓
   [Server] authMiddleware verifies JWT
   ↓
   Token valid → Proceed
   Token invalid/expired → 401 Unauthorized
```

## 🛡️ Middleware Pipeline

### Request Flow
```
Request
   ↓
CORS Middleware
   ↓
Body Parser (JSON/URL-encoded)
   ↓
Request Logger (logs all requests)
   ↓
Input Sanitizer (removes malicious chars)
   ↓
Request Size Limiter (max 10KB)
   ↓
Routes Handler
   ↓
Error Handler (catches all errors)
   ↓
404 Not Found Handler
   ↓
Response
```

### Available Middleware
- `authMiddleware.js` - JWT verification for protected routes
- `errorMiddleware.js` - Centralized error handling
- `validationMiddleware.js` - Input validation and sanitization

## 📡 API Endpoints Summary

### Authentication
```
POST   /api/auth/register        Register new user
POST   /api/auth/login           Login user
GET    /api/auth/profile         Get user profile (protected)
PUT    /api/auth/profile         Update profile (protected)
```

### Doctors
```
GET    /api/doctors              List all doctors
GET    /api/doctors/:id          Get doctor details
PUT    /api/doctors/:id          Update doctor profile (protected)
```

### Appointments
```
GET    /api/appointments         Get user appointments (protected)
POST   /api/appointments         Book appointment (protected)
PUT    /api/appointments/:id     Update appointment (protected)
DELETE /api/appointments/:id     Cancel appointment (protected)
```

### Medicines
```
GET    /api/medicines            List all medicines
GET    /api/medicines/:id        Get medicine details
POST   /api/orders               Create order (protected)
GET    /api/orders               Get user orders (protected)
```

### Admin Routes
```
GET    /api/admin/stats          Get hospital statistics (admin)
POST   /api/admin/doctors        Add new doctor (admin)
PUT    /api/admin/doctors/:id    Update doctor (admin)
DELETE /api/admin/doctors/:id    Delete doctor (admin)
POST   /api/admin/medicines      Add medicine (admin)
PUT    /api/admin/medicines/:id  Update medicine (admin)
DELETE /api/admin/medicines/:id  Delete medicine (admin)
```

### Chat (AI Chatbot)
```
POST   /api/chat/message         Send message to AI (uses OpenAI)
```

## 🔄 State Management

### Context API Usage

#### AuthContext
- Manages: User authentication state, login/logout
- Provides: `user`, `isAuthenticated`, `login()`, `logout()`, `register()`

#### ThemeContext
- Manages: Dark/light mode preference
- Provides: `theme`, `toggleTheme()`

#### CartContext
- Manages: Shopping cart for medicines
- Provides: `cart`, `addToCart()`, `removeFromCart()`, `clearCart()`

## 🎨 Styling Approach

- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Global styles in `index.css`
- **Framer Motion** - Smooth animations
- **Dynamic Theming** - Dark/light mode support via CSS variables

## 🚀 Performance Optimization

1. **Code Splitting** - Route-based splitting via React Router
2. **Lazy Loading** - Components loaded on demand
3. **Request Caching** - API responses cached in context
4. **Debouncing** - Search/filter operations debounced
5. **PWA** - Progressive Web App for offline support
6. **Compression** - Gzip compression on server

## 🧪 Error Handling

### Server-side
- Centralized error handler middleware
- Try-catch blocks in controllers
- Mongoose validation errors caught
- JWT errors handled specifically
- Database errors with helpful messages

### Client-side
- Axios interceptors catch API errors
- 401 errors trigger logout and redirect to login
- User-friendly error messages displayed
- Network timeouts handled (30s)

## 📱 Mobile Support

- **Capacitor** - Native iOS/Android wrapper
- **Responsive Design** - Mobile-first approach
- **PWA** - Works offline and installable
- **Mobile Navigation** - Touch-friendly UI

## 🔄 Data Flow Example: Booking Appointment

```
1. Patient views doctor profile
   ↓ GET /api/doctors/:id

2. Patient clicks "Book Appointment"
   ↓ AppointmentModal component opens

3. Patient fills form and submits
   ↓ POST /api/appointments
   ↓ [Server] Creates appointment in DB
   ↓ [Server] Sets status to "Pending"

4. Server responds with appointment details
   ↓ [Client] Updates AppointmentContext
   ↓ [Client] Shows confirmation message

5. Doctor reviews appointment
   ↓ Doctor logs into dashboard
   ↓ GET /api/appointments (filtered for doctor)

6. Doctor approves/rejects appointment
   ↓ PUT /api/appointments/:id
   ↓ [Server] Updates status

7. Patient gets notification
   ↓ [Client] Polls or socket updates appointment status
   ↓ Patient can reschedule or confirm
```

## 🔒 Security Features

1. **JWT Authentication** - Secure token-based auth
2. **Password Hashing** - bcryptjs for password storage
3. **Input Sanitization** - Removes XSS attack vectors
4. **CORS Protection** - Controlled origin access
5. **Request Size Limits** - Prevents large payloads
6. **Environment Variables** - Secrets not in code
7. **Error Messages** - Limited info in errors

## 📊 Database Design

### User Schema
- Email, password (hashed), name, phone, address
- Role: patient, doctor, admin
- Profile data (age, gender, blood group, etc.)

### Doctor Schema
- Extends User with specialization, fees, experience
- Availability schedule
- Prescription history

### Appointment Schema
- Doctor ID, Patient ID, date/time
- Status: pending, approved, rejected, completed
- Consultation notes

### Medicine Schema
- Name, description, price, stock quantity
- Category, manufacturer, dosage

### Order Schema
- User ID, medicines array with quantities
- Total amount, status, delivery address

---

**Last Updated:** August 2024
