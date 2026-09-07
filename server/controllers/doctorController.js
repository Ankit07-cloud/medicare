const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');

// @desc    Get all doctors with search and filters
// @route   GET /api/doctors
const getDoctors = async (req, res) => {
  try {
    const { specialization, search } = req.query;
    let query = { status: 'Active' };

    if (specialization && specialization !== 'All') {
      query.specialization = specialization;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    const doctors = await Doctor.find(query).select('-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new doctor (Admin only)
// @route   POST /api/doctors
const createDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, qualification, fees, photo, phone, about } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      qualification,
      fees,
      photo: photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      phone: phone || '+1 555-0144',
      about: about || 'Dedicated healthcare specialist committed to compassionate, high-quality patient care.'
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update doctor profile/info
// @route   PUT /api/doctors/:id
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    Object.assign(doctor, req.body);
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(req.body.password, salt);
    }

    const updated = await doctor.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete doctor (Admin only)
// @route   DELETE /api/doctors/:id
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
