const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// SIGN UP / REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists' });
    }

    // ✅ Always hash before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Sign Up successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: 'Please sign up first' });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: 'Password is incorrect' });
    }

    // Exclude password from response
    const { password: pwd, ...others } = user._doc;
    res.status(200).json({ user: others });
  } catch (error) {
    res.status(200).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
