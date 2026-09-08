const BloodRequest = require('../models/BloodRequest');

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const fileDetails = (req, fieldName) => {
  const file = req.files?.[fieldName]?.[0];
  if (!file) return undefined;

  return {
    originalName: file.originalname,
    fileName: file.filename,
    url: `${req.protocol}://${req.get('host')}/uploads/blood-requests/${file.filename}`
  };
};

const createBloodRequest = async (req, res) => {
  try {
    const { bloodGroup, appointmentDate, timeSlot, quantity, reason } = req.body;
    const parsedQuantity = Number(quantity);

    if (!bloodGroups.includes(bloodGroup) || !appointmentDate || !timeSlot || !reason || !Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 10) {
      return res.status(400).json({ message: 'Blood group, appointment details, quantity, and reason are required' });
    }

    const request = await BloodRequest.create({
      patient: req.user._id,
      bloodGroup,
      appointmentDate,
      timeSlot,
      quantity: parsedQuantity,
      reason,
      prescriptionFile: fileDetails(req, 'prescription'),
      medicalReportFile: fileDetails(req, 'medicalReport')
    });

    const populated = await BloodRequest.findById(request._id).populate('patient', 'name email phone bloodGroup');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ patient: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBloodRequestStatus = async (req, res) => {
  try {
    const allowedStatuses = ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'];
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Valid blood request status is required' });
    }

    const request = await BloodRequest.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate('patient', 'name email phone bloodGroup');

    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBloodRequest, getMyBloodRequests, updateBloodRequestStatus };
