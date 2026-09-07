const User = require('../models/User');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// @desc    Register a new patient
// @route   POST /api/auth/register
const registerPatient = async (req, res) => {
  try {
    const { name, email, password, age, gender, phone, address, bloodGroup, preferredPaymentMethod, paymentDetails } = req.body;

    const existingUser = await User.findOne({ email });
    const existingDoctor = await Doctor.findOne({ email });

    if (existingUser || existingDoctor) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'patient',
      age: age || 30,
      gender: gender || 'Male',
      phone: phone || '+1 555-0192',
      address: address || 'Kathmandu, Nepal',
      bloodGroup: bloodGroup || 'O+',
      preferredPaymentMethod: preferredPaymentMethod || 'eSewa',
      paymentDetails: paymentDetails || ''
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      preferredPaymentMethod: user.preferredPaymentMethod,
      paymentDetails: user.paymentDetails,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token (Patient, Doctor, Admin)
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let account = await User.findOne({ email });
    let role = account ? account.role : null;

    if (!account) {
      account = await Doctor.findOne({ email });
      if (account) role = 'doctor';
    }

    if (!account) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(account._id, role);

    res.json({
      _id: account._id,
      name: account.name,
      email: account.email,
      role,
      specialization: account.specialization || null,
      preferredPaymentMethod: account.preferredPaymentMethod || 'eSewa',
      paymentDetails: account.paymentDetails || '',
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
    user.preferredPaymentMethod = req.body.preferredPaymentMethod || user.preferredPaymentMethod;
    user.paymentDetails = req.body.paymentDetails || user.paymentDetails;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      age: updatedUser.age,
      gender: updatedUser.gender,
      phone: updatedUser.phone,
      address: updatedUser.address,
      bloodGroup: updatedUser.bloodGroup,
      preferredPaymentMethod: updatedUser.preferredPaymentMethod,
      paymentDetails: updatedUser.paymentDetails
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerPatient,
  loginUser,
  getUserProfile,
  updateUserProfile
};
