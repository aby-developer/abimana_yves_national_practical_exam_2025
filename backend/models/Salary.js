const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  totalDeduction: {
    type: String,
    required: true
  },
  netSalary: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("salary", salarySchema);