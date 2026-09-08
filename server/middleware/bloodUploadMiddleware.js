const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDirectory = path.join(__dirname, '..', 'uploads', 'blood-requests');
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    callback(null, safeName);
  }
});

const allowedMimeTypes = new Set(['application/pdf', 'image/jpeg', 'image/png']);

const fileFilter = (_req, file, callback) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    return callback(new Error('Only PDF, JPG, and PNG files are allowed'));
  }
  callback(null, true);
};

const bloodDocumentUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 2 }
});

module.exports = { bloodDocumentUpload };
