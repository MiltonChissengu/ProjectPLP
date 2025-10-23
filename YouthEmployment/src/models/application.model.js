// src/models/application.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Job = require('./job.model');

const Application = sequelize.define('Application', {
  status: { type: DataTypes.STRING, defaultValue: 'applied' } // applied, reviewed, hired, rejected
});

// associações
User.hasMany(Application);
Application.belongsTo(User);

Job.hasMany(Application);
Application.belongsTo(Job);

module.exports = Application;
