const Medicine = require('../models/Medicine');

// @desc    Get all medicines (Search & Category filter)
// @route   GET /api/medicines
const getMedicines = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get medicine by ID
// @route   GET /api/medicines/:id
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add medicine (Admin)
// @route   POST /api/medicines
const createMedicine = async (req, res) => {
  try {
    const { name, category, price, stock, image, description, requiresPrescription, dosage } = req.body;
    const medicine = await Medicine.create({
      name,
      category,
      price,
      stock,
      image,
      description,
      requiresPrescription: !!requiresPrescription,
      dosage
    });
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update medicine (Admin)
// @route   PUT /api/medicines/:id
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete medicine (Admin)
// @route   DELETE /api/medicines/:id
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
};
