import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Job from './Job.js';

const Application = sequelize.define('Application', {});
Application.belongsTo(User);
Application.belongsTo(Job);

export default Application;