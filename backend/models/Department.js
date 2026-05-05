const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  DepartmentCode: {
    type: String,
    required: true
  },
  DepartmentName: {
    type: String,
    required: true
  },
  GrossSalary: {
    type:String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("Department", DepartmentSchema);