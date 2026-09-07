const BloodBank = require('../models/BloodBank');

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getBloodAvailability = async (req, res) => {
  try {
    const records = await BloodBank.find({}).sort({ group: 1 });
    const byGroup = new Map(records.map((record) => [record.group, record.available]));
    res.json(bloodGroups.map((group) => ({ group, available: byGroup.get(group) || false })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBloodAvailability = async (req, res) => {
  try {
    const { group, available } = req.body;
    if (!bloodGroups.includes(group) || typeof available !== 'boolean') {
      return res.status(400).json({ message: 'Valid blood group and availability are required' });
    }

    const record = await BloodBank.findOneAndUpdate(
      { group },
      { group, available },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBloodAvailability, updateBloodAvailability };
