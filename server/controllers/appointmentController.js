const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Book a new appointment
// @route   POST /api/appointments
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, symptoms, paymentId } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      timeSlot,
      symptoms: symptoms || 'Routine Checkup',
      feePaid: !!paymentId,
      paymentId: paymentId || ''
    });

    const populated = await Appointment.findById(appointment._id)
      .populate('patient', 'name email phone bloodGroup')
      .populate('doctor', 'name specialization fees photo');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get patient's appointments
// @route   GET /api/appointments/my
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name specialization fees photo phone')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get doctor's appointments
// @route   GET /api/appointments/doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate('patient', 'name email phone age gender bloodGroup address')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialization')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status / prescription
// @route   PUT /api/appointments/:id/status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, prescription } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (status) appointment.status = status;
    if (prescription !== undefined) appointment.prescription = prescription;

    const updated = await appointment.save();
    const populated = await Appointment.findById(updated._id)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialization');

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'Cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit feedback for a completed appointment
// @route   POST /api/appointments/:id/feedback
const submitAppointmentFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only submit feedback for your own appointments' });
    }

    if (appointment.status !== 'Completed') {
      return res.status(400).json({ message: 'Feedback can only be submitted after the appointment is completed' });
    }

    if (appointment.reviewed) {
      return res.status(400).json({ message: 'Feedback has already been submitted for this appointment' });
    }

    appointment.reviewed = true;
    appointment.review = {
      rating,
      comment,
      date: Date.now()
    };
    await appointment.save();

    const doctor = await Doctor.findById(appointment.doctor);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    doctor.feedback.push({
      patient: req.user._id,
      patientName: req.user.name,
      rating,
      comment,
      date: Date.now()
    });
    doctor.feedbackCount = doctor.feedback.length;

    const totalRating = doctor.feedback.reduce((sum, item) => sum + item.rating, 0);
    doctor.rating = Number((totalRating / doctor.feedback.length).toFixed(1));

    const totalAppointments = await Appointment.countDocuments({ doctor: doctor._id });
    const completedAppointments = await Appointment.countDocuments({ doctor: doctor._id, status: 'Completed' });
    const completionRatio = totalAppointments ? completedAppointments / totalAppointments : 0;
    doctor.performanceScore = Number((((doctor.rating + 5 * completionRatio) / 2).toFixed(1)));

    await doctor.save();

    res.json({ message: 'Feedback submitted successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  submitAppointmentFeedback
};
