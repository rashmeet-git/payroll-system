require('dotenv').config(); 

const express = require('express');
const { connectDB, sequelize } = require('./config/database'); // Import the connectDB function and sequelize instance
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define a simple route for the API
app.get('/', (req, res) => {
    res.send('Payroll System API');
});

// Function to start the server
const startServer = async () => {
    try {
        await connectDB();  // Connect to the database
        await sequelize.sync({ force: false });  // Sync the tables
        console.log('Tables synced successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
    }
};

// Start the server
startServer();
