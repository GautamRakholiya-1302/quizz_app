
const express = require('express');
const multer = require('multer');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });


router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);

module.exports = router;
