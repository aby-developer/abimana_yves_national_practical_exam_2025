const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
 employeeNumber: {
    type: String,
    required: true
 },
  FirstName: {
    type: String,
    required: true
 },
  LastName: {
    type: String,
    required: true
 },
  Position: {
    type: String,
    required: true
 },
  Address: {
    type: String,
    required: true
 },
  Telephone: {
    type: String,
    required: true
 },
  Gender: {
    type: String,
    required: true
 },
  hiredDate: {
    type: String,
    required: true
 },
  Department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
 }
}, {timestamps: true});

module.exports = mongoose.model("Employee", employeeSchema);