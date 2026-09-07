# MediCare - Complete API Documentation

API documentation for MediCare Healthcare Management System.

## 📍 Base URL

**Development:** `http://localhost:5000/api`
**Production:** `https://your-api-domain.com/api`

## 🔑 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Token Expiration
- Tokens expire after 7 days
- Refresh tokens (optional future enhancement)

---

## 👤 Authentication Endpoints

### Register New User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "9876543210",
  "role": "patient"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "status": 201,
  "message": "User registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- `400` - Invalid input or email already exists
- `500` - Server error

---

### Login User

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Login successful",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- `400` - Invalid credentials
- `404` - User not found
- `500` - Server error

---

### Get User Profile

**Endpoint:** `GET /api/auth/profile` ✅ Protected

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Profile retrieved",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "patient",
    "createdAt": "2024-08-01T10:00:00Z"
  }
}
```

---

### Update User Profile

**Endpoint:** `PUT /api/auth/profile` ✅ Protected

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "9876543210",
  "address": "123 Main St"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St"
  }
}
```

---

## 🩺 Doctor Endpoints

### Get All Doctors

**Endpoint:** `GET /api/doctors`

**Query Parameters:**
```
?page=1&limit=10
?specialization=cardiology
?search=john
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Doctors retrieved",
  "data": {
    "doctors": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Dr. Sarah Jenkins",
        "email": "sarah.jenkins@medicare.com",
        "phone": "9876543210",
        "specialization": "Cardiology",
        "experience": 10,
        "consultationFee": 500,
        "qualifications": ["MBBS", "MD Cardiology"],
        "rating": 4.5,
        "reviews": 25
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

---

### Get Doctor Details

**Endpoint:** `GET /api/doctors/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Doctor details retrieved",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Dr. Sarah Jenkins",
    "email": "sarah.jenkins@medicare.com",
    "specialization": "Cardiology",
    "experience": 10,
    "consultationFee": 500,
    "bio": "Experienced cardiologist with 10+ years...",
    "availability": {
      "monday": ["09:00", "10:00", "14:00", "15:00"],
      "tuesday": ["09:00", "10:00", "14:00", "15:00"],
      "wednesday": null
    },
    "rating": 4.5,
    "reviews": 25
  }
}
```

---

### Update Doctor Profile

**Endpoint:** `PUT /api/doctors/:id` ✅ Protected (Doctor only)

**Request Body:**
```json
{
  "specialization": "Cardiology",
  "consultationFee": 600,
  "availability": {
    "monday": ["09:00", "10:00", "14:00"],
    "tuesday": ["09:00", "10:00", "14:00"]
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Doctor profile updated",
  "data": { /* updated doctor object */ }
}
```

---

## 📅 Appointment Endpoints

### Get User Appointments

**Endpoint:** `GET /api/appointments` ✅ Protected

**Query Parameters:**
```
?status=Pending
?page=1&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Appointments retrieved",
  "data": {
    "appointments": [
      {
        "_id": "607f1f77bcf86cd799439020",
        "doctorId": "507f1f77bcf86cd799439012",
        "doctorName": "Dr. Sarah Jenkins",
        "patientId": "507f1f77bcf86cd799439011",
        "patientName": "John Doe",
        "appointmentDate": "2024-08-15",
        "appointmentTime": "10:00",
        "status": "Pending",
        "consultationFee": 500,
        "notes": "Patient complained about chest pain",
        "createdAt": "2024-08-01T10:00:00Z"
      }
    ]
  }
}
```

---

### Book Appointment

**Endpoint:** `POST /api/appointments` ✅ Protected

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439012",
  "appointmentDate": "2024-08-15",
  "appointmentTime": "10:00",
  "notes": "Chest pain consultation"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "status": 201,
  "message": "Appointment booked successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439020",
    "doctorId": "507f1f77bcf86cd799439012",
    "patientId": "507f1f77bcf86cd799439011",
    "appointmentDate": "2024-08-15",
    "appointmentTime": "10:00",
    "status": "Pending",
    "notes": "Chest pain consultation"
  }
}
```

---

### Update Appointment Status

**Endpoint:** `PUT /api/appointments/:id` ✅ Protected (Doctor only)

**Request Body:**
```json
{
  "status": "Approved",
  "prescriptionNotes": "Take aspirin twice daily"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Appointment updated",
  "data": {
    "_id": "607f1f77bcf86cd799439020",
    "status": "Approved",
    "prescriptionNotes": "Take aspirin twice daily"
  }
}
```

---

### Cancel Appointment

**Endpoint:** `DELETE /api/appointments/:id` ✅ Protected

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Appointment cancelled successfully"
}
```

---

## 💊 Medicine Endpoints

### Get All Medicines

**Endpoint:** `GET /api/medicines`

**Query Parameters:**
```
?category=antibiotics
?search=aspirin
?page=1&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Medicines retrieved",
  "data": {
    "medicines": [
      {
        "_id": "507f1f77bcf86cd799439030",
        "name": "Aspirin",
        "manufacturer": "Bayer",
        "dosage": "500mg",
        "category": "Pain Relief",
        "price": 150,
        "stock": 100,
        "description": "Effective pain reliever",
        "sideEffects": ["Stomach upset"],
        "usage": "Take one tablet every 4-6 hours"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50
    }
  }
}
```

---

### Get Medicine Details

**Endpoint:** `GET /api/medicines/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Medicine details retrieved",
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "name": "Aspirin",
    "manufacturer": "Bayer",
    "price": 150,
    "stock": 100,
    "usage": "Take as directed"
  }
}
```

---

## 🛒 Order Endpoints

### Create Order

**Endpoint:** `POST /api/orders` ✅ Protected

**Request Body:**
```json
{
  "medicines": [
    {
      "medicineId": "507f1f77bcf86cd799439030",
      "quantity": 2
    },
    {
      "medicineId": "507f1f77bcf86cd799439031",
      "quantity": 1
    }
  ],
  "deliveryAddress": "123 Main St, City",
  "paymentMethod": "card"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "status": 201,
  "message": "Order placed successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439040",
    "userId": "507f1f77bcf86cd799439011",
    "medicines": [
      {
        "medicineId": "507f1f77bcf86cd799439030",
        "name": "Aspirin",
        "quantity": 2,
        "price": 150,
        "total": 300
      }
    ],
    "totalAmount": 300,
    "status": "Pending",
    "deliveryAddress": "123 Main St, City",
    "createdAt": "2024-08-01T10:00:00Z"
  }
}
```

---

### Get User Orders

**Endpoint:** `GET /api/orders` ✅ Protected

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Orders retrieved",
  "data": {
    "orders": [
      {
        "_id": "607f1f77bcf86cd799439040",
        "totalAmount": 300,
        "status": "Delivered",
        "createdAt": "2024-08-01T10:00:00Z"
      }
    ]
  }
}
```

---

## 👨‍💼 Admin Endpoints

All admin endpoints require ✅ Protected with admin role

### Get Dashboard Statistics

**Endpoint:** `GET /api/admin/stats`

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Statistics retrieved",
  "data": {
    "totalDoctors": 25,
    "totalPatients": 1250,
    "totalAppointments": 5600,
    "totalMedicines": 150,
    "pendingAppointments": 45,
    "completedAppointments": 5500,
    "revenueThisMonth": 250000,
    "revenueThisYear": 2500000
  }
}
```

---

### Add New Doctor

**Endpoint:** `POST /api/admin/doctors`

**Request Body:**
```json
{
  "name": "Dr. John Smith",
  "email": "john.smith@medicare.com",
  "password": "securePassword",
  "phone": "9876543210",
  "specialization": "Neurology",
  "experience": 15,
  "qualifications": ["MBBS", "MD Neurology"],
  "consultationFee": 600
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "status": 201,
  "message": "Doctor added successfully"
}
```

---

### Add New Medicine

**Endpoint:** `POST /api/admin/medicines`

**Request Body:**
```json
{
  "name": "Paracetamol",
  "manufacturer": "GSK",
  "dosage": "500mg",
  "category": "Pain Relief",
  "price": 50,
  "stock": 500,
  "description": "Effective pain and fever reducer",
  "usage": "Take one tablet every 4-6 hours"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "status": 201,
  "message": "Medicine added successfully"
}
```

---

## 💬 Chat/AI Endpoints

### Send Message to AI

**Endpoint:** `POST /api/chat/message` ✅ Protected

**Request Body:**
```json
{
  "message": "What are the symptoms of fever?"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "status": 200,
  "message": "Response generated",
  "data": {
    "userMessage": "What are the symptoms of fever?",
    "aiResponse": "Common symptoms of fever include elevated body temperature, chills, fatigue...",
    "timestamp": "2024-08-01T10:00:00Z"
  }
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "status": 400,
  "message": "Validation error",
  "errors": ["Email is required", "Password must be 6+ characters"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "status": 401,
  "message": "Invalid token or token expired"
}
```

### 404 Not Found
```json
{
  "success": false,
  "status": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "status": 500,
  "message": "Internal server error",
  "error": "Details for development only"
}
```

---

## 🔄 Common Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "status": 200,
  "message": "Response message",
  "data": { /* actual data */ }
}
```

---

## 📊 Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal error |

---

## 🧪 Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "email":"john@example.com",
    "password":"pass123",
    "role":"patient"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"pass123"
  }'

# Get doctors
curl http://localhost:5000/api/doctors

# Protected endpoint with token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/appointments
```

---

**Last Updated:** August 2024
