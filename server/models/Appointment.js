const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    symptoms: { type: String, default: 'General checkup' },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
    prescription: { type: String, default: '' },
    feePaid: { type: Boolean, default: false },
    paymentId: { type: String, default: '' },
    reviewed: { type: Boolean, default: false },
    review: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String, default: '' },
      date: { type: Date }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
