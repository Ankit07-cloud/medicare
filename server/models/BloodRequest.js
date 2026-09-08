const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true
    },
    appointmentDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    quantity: { type: Number, min: 1, max: 10, required: true },
    reason: { type: String, required: true, maxlength: 500 },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
    prescriptionFile: {
      originalName: { type: String, default: '' },
      fileName: { type: String, default: '' },
      url: { type: String, default: '' }
    },
    medicalReportFile: {
      originalName: { type: String, default: '' },
      fileName: { type: String, default: '' },
      url: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
