// src/app.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Serve arquivos estáticos da pasta client
app.use(express.static(path.join(__dirname, '../client')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas básicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
});

module.exports = app;