// src/models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false},
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' }, // USER | EMPLOYER | ADMIN
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
});

module.exports = User;
