const { Sequelize } = require('sequelize');
require('dotenv').config(); 


const DATABASE_NAME = process.env.payrollsysdb;       
const DATABASE_USER = process.env.root;     
const DATABASE_PASSWORD = process.env.Tech_123; 
const DATABASE_HOST = process.env.localhost;      


const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql', 
    logging: false,   
});


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};


module.exports = { sequelize, connectDB };
