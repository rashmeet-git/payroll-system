// backend/models/AttendanceApplication.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AttendanceApplication = sequelize.define('AttendanceApplication', {
  application_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  application_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vacation_from: {
    type: DataTypes.DATE,
    allowNull: true
  },
  vacation_to: {
    type: DataTypes.DATE,
    allowNull: true
  },
  change_reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  application_status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  submitted_on: {
    type: DataTypes.DATE,
    allowNull: true
  },
  approved_on: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'attendance_application',
  timestamps: false
});

module.exports = AttendanceApplication;
