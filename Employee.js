const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/database'); 

const Employee = sequelize.define('Employee', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  name: {
      type: DataTypes.STRING,
  },
  department: { 
      type: DataTypes.STRING,
  },
  role: { 
      type: DataTypes.STRING,
  },
  password: {
      type: DataTypes.STRING,
  },
  base_salary: { 
      type: DataTypes.DOUBLE,
  },
  variable_salary: { 
      type: DataTypes.DOUBLE,
  },
  final_salary: { 
      type: DataTypes.DOUBLE,
  },
}, {
  freezeTableName: true, 
  timestamps: false, 
});
