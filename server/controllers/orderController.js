const Order = require('../models/Order');
const Medicine = require('../models/Medicine');

// @desc    Create a new pharmacy order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, paymentMethod, paymentId, deliveryAddress, notes } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart must contain at least one item.' });
    }

    if (!deliveryAddress || typeof deliveryAddress !== 'string') {
      return res.status(400).json({ message: 'Delivery address is required.' });
    }

    const items = await Promise.all(
      cartItems.map(async (item) => {
        const medicine = await Medicine.findById(item._id);
        if (!medicine) {
          throw new Error(`Medicine not found: ${item.name || item._id}`);
        }

        const quantity = Number(item.quantity) || 1;
        return {
          medicine: medicine._id,
          name: medicine.name,
          quantity,
          price: medicine.price,
          total: parseFloat((medicine.price * quantity).toFixed(2))
        };
      })
    );

    const order = await Order.create({
      patient: req.user._id,
      items,
      totalAmount: Number(totalAmount.toFixed ? totalAmount : parseFloat(totalAmount)) || 0,
      paymentMethod: paymentMethod || 'cod',
      paymentId: paymentId || '',
      paymentStatus: paymentMethod === 'cod' ? 'COD' : paymentId ? 'Paid' : 'Pending',
      deliveryAddress,
      notes: notes || ''
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current patient orders
// @route   GET /api/orders/my
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ patient: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders for admin
// @route   GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('patient', 'name email phone address')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('patient', 'name email phone address');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role === 'patient' && order.patient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order delivery status / payment status
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { deliveryStatus, paymentStatus, rider } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (rider) order.rider = { ...order.rider, ...rider };

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};
