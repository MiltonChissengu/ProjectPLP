// src/app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/jobs.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);

// Serve arquivos estáticos da pasta client
app.use(express.static(path.join(__dirname, '../client')));

// Rotas básicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/register.html'));
});

module.exports = app;