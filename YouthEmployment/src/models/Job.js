import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Job = sequelize.define('Job', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  location: DataTypes.STRING
});

export default Job;