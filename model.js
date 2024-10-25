const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  base_salary: {
    type: Number,
    required: true,
  },
  variable_salary: {
    type: Number,
    required: true,
  },
  final_salary: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// Manager Schema
const managerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// HrAdmin Schema
const hrAdminSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  attendance_id: {
    type: Number,
    required: true,
    unique: true,
  },
  employee_id: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  check_in_time: {
    type: String,
    required: false,
  },
  check_out_time: {
    type: String,
    required: false,
  },
  attendance_type: {
    type: String,
    required: false,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

// Attendance Application Schema
const attendanceApplicationSchema = new mongoose.Schema({
  application_id: {
    type: Number,
    required: true,
    unique: true,
  },
  employee_id: {
    type: Number,
    required: true,
  },
  application_type: {
    type: String,
    required: false,
  },
  vacation_from: {
    type: Date,
    required: false,
  },
  vacation_to: {
    type: Date,
    required: false,
  },
  change_reason: {
    type: String,
    required: false,
  },
  application_status: {
    type: String,
    required: false,
  },
  submitted_on: {
    type: Date,
    default: Date.now,
  },
  approved_on: {
    type: Date,
    required: false,
  },
});

// Payroll Schema
const payrollSchema = new mongoose.Schema({
  payroll_id: {
    type: Number,
    required: true,
    unique: true,
  },
  employee_id: {
    type: Number,
    required: true,
  },
  salary_breakdown: {
    type: String,
    required: false,
  },
  overtime: {
    type: Number,
    required: false,
  },
  deductions: {
    type: Number,
    required: false,
  },
  total_pay: {
    type: Number,
    required: false,
  },
});

// Create Models
const Employee = mongoose.model('Employee', employeeSchema);
const Manager = mongoose.model('Manager', managerSchema);
const HrAdmin = mongoose.model('HrAdmin', hrAdminSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const AttendanceApplication = mongoose.model('AttendanceApplication', attendanceApplicationSchema);
const Payroll = mongoose.model('Payroll', payrollSchema);

// Export Models
module.exports = {
  Employee,
  Manager,
  HrAdmin,
  Attendance,
  AttendanceApplication,
  Payroll,
};
