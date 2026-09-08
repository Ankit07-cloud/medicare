const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');
const { requestLogger, sanitizeInput, requestSizeLimiter } = require('./middleware/validationMiddleware');
const Doctor = require('./models/Doctor');
const seedData = require('./seed');

dotenv.config();

const app = express();
const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174'
].filter(Boolean));

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Custom Middleware
app.use(requestLogger);
app.use(sanitizeInput);
app.use(requestSizeLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/blood-bank', require('./routes/bloodBankRoutes'));
app.use('/api/blood-requests', require('./routes/bloodRequestRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'MediCare API Running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error & 404 handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server and Connect DB
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed check on start
    try {
      const doctorCount = await Doctor.countDocuments();
      if (doctorCount === 0) {
        console.log('No doctors found in DB. Auto-seeding initial database...');
        await seedData(false);
      }
    } catch (seedErr) {
      console.log('Auto-seed check notice:', seedErr.message);
    }

    const startListening = (port, retries = 3) => {
      const server = app.listen(port, () => {
        console.log(`MediCare Server active on http://localhost:${port}`);
      });

      server.on('error', async (err) => {
        if (err.code === 'EADDRINUSE' && retries > 0) {
          console.warn(`Port ${port} in use, retrying on port ${port + 1}...`);
          setTimeout(() => startListening(port + 1, retries - 1), 200);
        } else {
          console.error('Server failed to start:', err.message);
          process.exit(1);
        }
      });
    };

    startListening(Number(PORT));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
