// Request validation and logging middleware

// Request logger
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`;
    if (res.statusCode >= 400) {
      console.error(log);
    } else {
      console.log(log);
    }
  });
  
  next();
};

// Input sanitization
const sanitizeInput = (req, res, next) => {
  const sanitizeValue = (value) => {
    if (typeof value === 'string') {
      return value.trim().replace(/[<>]/g, '');
    }
    if (Array.isArray(value)) {
      return value.map(sanitizeValue);
    }
    if (typeof value === 'object' && value !== null) {
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, sanitizeValue(v)])
      );
    }
    return value;
  };

  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  if (req.params) req.params = sanitizeValue(req.params);
  
  next();
};

// Request size limiter
const requestSizeLimiter = (req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && req.headers['content-type']) {
    if (!req.is('application/json') && !req.is('multipart/form-data') && !req.is('application/x-www-form-urlencoded')) {
      return res.status(415).json({
        success: false,
        message: 'Content-Type must be application/json or urlencoded'
      });
    }
  }
  next();
};

module.exports = {
  requestLogger,
  sanitizeInput,
  requestSizeLimiter
};
