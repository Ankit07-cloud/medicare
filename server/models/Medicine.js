const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 50 },
    image: { type: String, default: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
    description: { type: String, required: true },
    requiresPrescription: { type: Boolean, default: false },
    dosage: { type: String, default: '1 tablet daily or as directed by doctor' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);
