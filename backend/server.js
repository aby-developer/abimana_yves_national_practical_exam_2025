require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Employee Management System API");
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/salaries", require("./routes/salaryRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});