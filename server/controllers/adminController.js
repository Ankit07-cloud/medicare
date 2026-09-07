const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Medicine = require('../models/Medicine');

// @desc    Get dashboard summary statistics for Admin
// @route   GET /api/admin/stats
const getAdminStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments({ status: 'Active' });
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalAppointments = await Appointment.countDocuments({});
    const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });
    const totalMedicines = await Medicine.countDocuments({});

    const recentAppointments = await Appointment.find({})
      .populate('patient', 'name email')
      .populate('doctor', 'name specialization')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      pendingAppointments,
      totalMedicines,
      recentAppointments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all patients list
// @route   GET /api/admin/patients
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete patient
// @route   DELETE /api/admin/patients/:id
const deletePatient = async (req, res) => {
  try {
    const patient = await User.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminStats,
  getPatients,
  deletePatient
};
