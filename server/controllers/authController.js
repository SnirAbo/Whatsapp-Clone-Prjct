const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Auth = require('../services/authService'); 
require('dotenv').config();

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET;

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. חפש את המשתמש במסד הנתונים לפי username
    const user = await Auth.login(username);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 2. בדוק סיסמה עם bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 3. צור JWT עם ID של המשתמש
    const token = jwt.sign({ id: user._id, displayName: user.displayName }, SECRET_KEY, { expiresIn: '24h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Register
router.post('/register', async (req, res) => {
  try {
    const obj = req.body;
    obj.password = await bcrypt.hash(obj.password, 10);
    const result = await Auth.register(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});



module.exports = router;
