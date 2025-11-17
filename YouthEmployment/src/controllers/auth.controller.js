// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Incomplete data' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const secound = date.getSeconds();
    const createdAt = `${year}-${month}-${day} ${hour}:${minutes}:${secound}`;
    const updatedAt = `${year}-${month}-${day} ${hour}:${minutes}:${secound}`;
    // const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password, role: role || 'USER' , createdAt, updatedAt});
    const token = generateToken(user);
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt}, accessToken: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Incomplete data' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.status(401).json({ error: 'Incorrect password' });
    if (password !== user.password) return res.status(401).json({ error: 'Incorrect password' });

    const token = generateToken(user);
    res.json({ accessToken: token, user: { id: user.id, name: user.name, email: user.email, password: user.password, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
