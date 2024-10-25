const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/database'); 

const Attendance = sequelize.define('Attendance', {
  attendance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: DataTypes.INTEGER
  },
  date: {
    type: DataTypes.DATEONLY
  },
  check_in_time: {
    type: DataTypes.TIME
  },
  check_out_time: {
    type: DataTypes.TIME
  },
  attendance_type: {
    type: DataTypes.STRING
  },
  month: {
    type: DataTypes.INTEGER
  },
  year: {
    type: DataTypes.INTEGER
  }
});

module.exports = Attendance;
