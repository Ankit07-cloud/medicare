const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'medicare_jwt_super_secret_key_2026';
    const decoded = jwt.verify(token, secret);

    if (decoded.role === 'doctor') {
      req.user = await Doctor.findById(decoded.id).select('-password');
      if (req.user) req.user.role = 'doctor';
    } else {
      req.user = await User.findById(decoded.id).select('-password');
    }

    if (!req.user) {
      return res.status(401).json({ message: 'User account not found' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user ? req.user.role : 'guest'}) is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
