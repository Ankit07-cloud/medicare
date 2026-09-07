const express = require('express');
const router = express.Router();
const { getBloodAvailability, updateBloodAvailability } = require('../controllers/bloodBankController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getBloodAvailability);
router.put('/', protect, authorize('admin'), updateBloodAvailability);

module.exports = router;
