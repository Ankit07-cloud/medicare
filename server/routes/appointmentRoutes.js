const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  submitAppointmentFeedback
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('patient'), bookAppointment);
router.get('/my', protect, authorize('patient'), getMyAppointments);
router.get('/doctor', protect, authorize('doctor'), getDoctorAppointments);
router.get('/', protect, authorize('admin'), getAllAppointments);
router.put('/:id/status', protect, authorize('doctor', 'admin'), updateAppointmentStatus);
router.post('/:id/feedback', protect, authorize('patient'), submitAppointmentFeedback);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;
