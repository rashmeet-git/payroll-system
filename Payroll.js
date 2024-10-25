const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/database'); 

const Payroll = sequelize.define('Payroll', {
  payroll_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  salary_breakdown: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  overtime: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  deductions: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  total_pay: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  tableName: 'payroll',
  timestamps: false
});

module.exports = Payroll;
