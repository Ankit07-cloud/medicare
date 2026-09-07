const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    qualification: { type: String, required: true },
    photo: { type: String, default: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400' },
    fees: { type: Number, required: true },
    phone: { type: String, default: '+1 555-0144' },
    about: { type: String, default: 'Dedicated healthcare specialist committed to compassionate, high-quality patient care.' },
    availability: {
      type: [String],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    timeSlots: {
      type: [String],
      default: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
    },
    rating: { type: Number, default: 4.9 },
    performanceScore: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 128 },
    feedbackCount: { type: Number, default: 0 },
    feedback: [
      {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        patientName: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now }
      }
    ],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    role: { type: String, default: 'doctor' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
