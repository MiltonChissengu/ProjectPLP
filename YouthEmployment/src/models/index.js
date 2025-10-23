// src/models/index.js
const sequelize = require('../config/db');
const User = require('./user.model');
const Job = require('./job.model');
const Application = require('./application.model');

module.exports = {
  sequelize,
  User,
  Job,
  Application
};
