const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/database'); 

const Manager = sequelize.define('Manager', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  name: {  // Added name field
      type: DataTypes.STRING,
  },
  password: {
      type: DataTypes.STRING,
  },
  role: {  // Added role field
      type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
