const express = require('express');
const router = express.Router();
const {
  createBloodRequest,
  getMyBloodRequests,
  updateBloodRequestStatus
} = require('../controllers/bloodRequestController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { bloodDocumentUpload } = require('../middleware/bloodUploadMiddleware');

router.use(protect);
router.post(
  '/',
  authorize('patient'),
  bloodDocumentUpload.fields([
    { name: 'prescription', maxCount: 1 },
    { name: 'medicalReport', maxCount: 1 }
  ]),
  createBloodRequest
);
router.get('/my', authorize('patient'), getMyBloodRequests);
router.put('/:id/status', authorize('admin'), updateBloodRequestStatus);

module.exports = router;
