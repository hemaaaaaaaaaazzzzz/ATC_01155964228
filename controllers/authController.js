const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//  create JWT
const createToken = (userId) => {
  return jwt.sign({ id: userId }, "your_super_secret_key", { expiresIn: '7d' });
};

// Register 
exports.register = async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      Name,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);

    res.status(201).json({
      message: 'Registered successfully',
      token,
      user: { id: newUser._id, Name: newUser.Name, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid ' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid ' });

    const token = createToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, Name: user.Name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

  