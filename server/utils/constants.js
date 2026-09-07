// Common constants used across the server
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin'
};

const APPOINTMENT_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  COMPLETED: 'Completed'
};

const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

const RESPONSE_MESSAGES = {
  SUCCESS: 'Operation successful',
  ERROR: 'An error occurred',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Access denied. Please authenticate.',
  RESOURCE_NOT_FOUND: 'Resource not found',
  ALREADY_EXISTS: 'Resource already exists',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
  SERVER_ERROR: 'Internal server error. Please try again later.'
};

module.exports = {
  HTTP_STATUS,
  ROLES,
  APPOINTMENT_STATUS,
  ORDER_STATUS,
  RESPONSE_MESSAGES
};
