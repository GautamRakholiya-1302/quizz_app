
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');


exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, birthdate, phoneNumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = req.file ? path.join('uploads', req.file.filename) : '';
    const newUser = new User({
      firstName,
      lastName,
      email,
      profilePicture,
      birthdate,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Registration Successful", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
     
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Create JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    
      res.json({
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          birthdate: user.birthdate,
          profilePicture: user.profilePicture, 
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };