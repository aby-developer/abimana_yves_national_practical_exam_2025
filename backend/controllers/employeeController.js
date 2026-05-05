const Employee = require("../models/Employee");

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (error) {
    res.send(error);
  }
};

// GET
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};