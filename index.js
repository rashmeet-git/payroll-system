require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const Attendance = require('./models/Attendance'); 


const sequelize = new Sequelize('payrollsysdb', 'root', 'Tech_123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, 
});

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

const Manager = sequelize.define('Manager', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

const HrAdmin = sequelize.define('HrAdmin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {  
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {  
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));

// Login API
app.post('/api/login', async (req, res) => {
    const { id, password, role } = req.body;
    console.log("checked");
    try {
        let user;

        if (role === 'employee') {
            user = await Employee.findOne({ where: { id, password } });
        } else if (role === 'manager') {
            user = await Manager.findOne({ where: { id, password } });
        } else if (role === 'hradmin') {
            user = await HrAdmin.findOne({ where: { id, password } });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/attendance/:id', async (req, res) => {
    try {
        
        const employeeId = req.params.id;
        const { month, year } = req.query;

        // Validate month and year inputs
        if (!month || !year) {
            return res.status(400).json({ message: 'Month and year are required' });
        }

        console.log(`Fetching attendance records for Employee ID: ${employeeId}, Month: ${month}, Year: ${year}`);

        
        const attendanceRecords = await Attendance.findAll({
            where: {
                employee_id: employeeId,
                month: parseInt(month, 10),  
                year: parseInt(year, 10)
            }
        });  
        
        

        if (attendanceRecords.length > 0) {
            res.json(attendanceRecords);
        } else {
            res.status(404).json({ message: 'No attendance records found for this employee in the specified month and year' });
        }
    } catch (error) {
        console.error("Error fetching attendance records:", error);  // More detailed logging
        res.status(500).json({ message: error.message });
    }
});


// CRUD Operations for Employees
app.get('/api/employee/:id', async (req, res) => {
    try {
        console.log("checked-app-get");
        const employeeId = req.params.id;
        const employee = await Employee.findByPk(employeeId);
        if (employee) {
            res.json(employee);  
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/employee', async (req, res) => {
    console.log('Incoming data:', req.body); // Log the incoming data
    try {
        const newEmployee = req.body;
        const employee = await Employee.create(newEmployee);
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error creating employee:', error); // Log any error that occurs
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/employee/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updatedData = req.body;
        const [updated] = await Employee.update(updatedData, { where: { id: employeeId } });
        if (updated) {
            res.json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/employee/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const result = await Employee.destroy({ where: { id: employeeId } });
        if (result) {
            res.json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CRUD Operations for Managers
app.get('/api/managers/:id', async (req, res) => {
    try {
        const managerId = req.params.id;
        const manager = await Manager.findByPk(managerId);
        if (manager) {
            res.json(manager);  // This should return all fields of the manager
        } else {
            res.status(404).json({ message: 'Manager not found' });
        }
    } catch (error) {
        console.error('Error fetching manager:', error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/manager', async (req, res) => {
    try {
        const newManager = req.body;
        const manager = await Manager.create(newManager);
        res.status(201).json(manager);
    } catch (error) {
        console.error('Error creating manager:', error);
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/manager/:id', async (req, res) => {
    try {
        const managerId = req.params.id;
        const updatedData = req.body;
        const [updated] = await Manager.update(updatedData, { where: { id: managerId } });
        if (updated) {
            res.json({ message: 'Manager updated successfully' });
        } else {
            res.status(404).json({ message: 'Manager not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/manager/:id', async (req, res) => {
    try {
        const managerId = req.params.id;
        const result = await Manager.destroy({ where: { id: managerId } });
        if (result) {
            res.json({ message: 'Manager deleted successfully' });
        } else {
            res.status(404).json({ message: 'Manager not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CRUD Operations for HR Admins
app.get('/api/hradmin/:id', async (req, res) => {
    try {
        const hrAdminId = req.params.id;
        const hrAdmin = await HrAdmin.findByPk(hrAdminId);
        if (hrAdmin) {
            res.json(hrAdmin);
        } else {
            res.status(404).json({ message: 'HR Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/hradmin', async (req, res) => {
    try {
        const newHrAdmin = req.body;
        const hrAdmin = await HrAdmin.create(newHrAdmin);
        res.status(201).json(hrAdmin);
    } catch (error) {
        console.error('Error creating HR Admin:', error);
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/hradmin/:id', async (req, res) => {
    try {
        const hrAdminId = req.params.id;
        const updatedData = req.body;
        const [updated] = await HrAdmin.update(updatedData, { where: { id: hrAdminId } });
        if (updated) {
            res.json({ message: 'HR Admin updated successfully' });
        } else {
            res.status(404).json({ message: 'HR Admin not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/hradmin/:id', async (req, res) => {
    try {
        const hrAdminId = req.params.id;
        const result = await HrAdmin.destroy({ where: { id: hrAdminId } });
        if (result) {
            res.json({ message: 'HR Admin deleted successfully' });
        } else {
            res.status(404).json({ message: 'HR Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CRUD Operations for Attendance
app.post('/api/attendance', async (req, res) => {
    console.log('Incoming attendance data:', req.body); 
    try {
        const newAttendance = req.body;
        const attendance = await Attendance.create(newAttendance);
        res.status(201).json(attendance);
    } catch (error) {
        console.error('Error creating attendance record:', error); 
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/attendance/:attendanceId', async (req, res) => {
    try {
        const attendanceId = req.params.attendanceId;
        const updatedData = req.body;
        const [updated] = await Attendance.update(updatedData, { where: { attendance_id: attendanceId } });
        if (updated) {
            res.json({ message: 'Attendance record updated successfully' });
        } else {
            res.status(404).json({ message: 'Attendance record not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/attendance/:attendanceId', async (req, res) => {
    try {
        const attendanceId = req.params.attendanceId;
        const result = await Attendance.destroy({ where: { attendance_id: attendanceId } });
        if (result) {
            res.json({ message: 'Attendance record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Attendance record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// CRUD Operations for Payroll
app.get('/api/payroll/:employeeId', async (req, res) => {
    try {
        console.log("Fetching payroll records");
        const employeeId = req.params.employeeId;
        const payrollRecords = await Payroll.findAll({ where: { employee_id: employeeId } });
        if (payrollRecords.length) {
            res.json(payrollRecords);
        } else {
            res.status(404).json({ message: 'No payroll records found for this employee' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/payroll', async (req, res) => {
    console.log('Incoming payroll data:', req.body); // Log the incoming data
    try {
        const newPayroll = req.body;
        const payroll = await Payroll.create(newPayroll);
        res.status(201).json(payroll);
    } catch (error) {
        console.error('Error creating payroll record:', error); // Log any error that occurs
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/payroll/:payrollId', async (req, res) => {
    try {
        const payrollId = req.params.payrollId;
        const updatedData = req.body;
        const [updated] = await Payroll.update(updatedData, { where: { payroll_id: payrollId } });
        if (updated) {
            res.json({ message: 'Payroll record updated successfully' });
        } else {
            res.status(404).json({ message: 'Payroll record not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/payroll/:payrollId', async (req, res) => {
    try {
        const payrollId = req.params.payrollId;
        const result = await Payroll.destroy({ where: { payroll_id: payrollId } });
        if (result) {
            res.json({ message: 'Payroll record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Payroll record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch all attendance applications
app.get('/api/attendance-application', async (req, res) => {
    try {
        const applications = await AttendanceApplication.findAll();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update attendance application status
app.put('/api/attendance-application/:applicationId', async (req, res) => {
    const applicationId = req.params.applicationId;
    const { application_status, approved_on } = req.body;

    try {
        const [updated] = await AttendanceApplication.update(
            { application_status, approved_on },
            { where: { application_id: applicationId } }
        );

        if (updated) {
            res.json({ message: 'Application updated successfully' });
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
