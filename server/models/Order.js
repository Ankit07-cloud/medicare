const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: 'Order must contain at least one item.'
      }
    },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['card', 'upi', 'wallet', 'cod', 'other'],
      default: 'card'
    },
    paymentId: { type: String, default: '' },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'COD'],
      default: 'Pending'
    },
    deliveryStatus: {
      type: String,
      enum: ['Order Confirmed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Order Confirmed'
    },
    deliveryAddress: { type: String, required: true },
    orderNumber: { type: String, unique: true },
    notes: { type: String, default: '' },
    rider: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      vehicle: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

orderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    const suffix = Math.floor(100 + Math.random() * 900);
    this.orderNumber = `MED-${Date.now().toString().slice(-6)}-${suffix}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
