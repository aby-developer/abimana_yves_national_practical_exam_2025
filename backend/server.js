require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");
const Department = require("./models/Department");
const Employee = require("./models/Employee");
const Salary = require("./models/Salary");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


// =====================================
// INSERT DEFAULT DATA
// =====================================

const seedData = async () => {

  try {

    // ================= USER =================

    const existingUser = await User.findOne({
      username: "admin"
    });

    if (!existingUser) {

      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        username: "admin",
        password: hashedPassword
      });

      console.log("✅ Default admin inserted");

    } else {

      console.log("⚠️ Admin already exists");
    }


    // ================= DEPARTMENTS =================

    const deptCount = await Department.countDocuments();

    if (deptCount === 0) {

      const departments = await Department.insertMany([

        {
          DepartmentCode: "DEP001",
          DepartmentName: "IT",
          GrossSalary: "500000"
        },

        {
          DepartmentCode: "DEP002",
          DepartmentName: "Finance",
          GrossSalary: "600000"
        },

        {
          DepartmentCode: "DEP003",
          DepartmentName: "HR",
          GrossSalary: "400000"
        },

        {
          DepartmentCode: "DEP004",
          DepartmentName: "Marketing",
          GrossSalary: "450000"
        }

      ]);

      console.log("✅ 4 Departments inserted");


      // ================= EMPLOYEES =================

      const employees = await Employee.insertMany([

        {
          employeeNumber: "EMP001",
          FirstName: "John",
          LastName: "Doe",
          Position: "Developer",
          Address: "Kigali",
          Telephone: "0781111111",
          Gender: "Male",
          hiredDate: "2025-01-10",
          Department: departments[0]._id
        },

        {
          employeeNumber: "EMP002",
          FirstName: "Alice",
          LastName: "Smith",
          Position: "Accountant",
          Address: "Huye",
          Telephone: "0782222222",
          Gender: "Female",
          hiredDate: "2025-02-11",
          Department: departments[1]._id
        },

        {
          employeeNumber: "EMP003",
          FirstName: "David",
          LastName: "Brown",
          Position: "HR Officer",
          Address: "Musanze",
          Telephone: "0783333333",
          Gender: "Male",
          hiredDate: "2025-03-12",
          Department: departments[2]._id
        },

        {
          employeeNumber: "EMP004",
          FirstName: "Grace",
          LastName: "Wilson",
          Position: "Marketing Manager",
          Address: "Rubavu",
          Telephone: "0784444444",
          Gender: "Female",
          hiredDate: "2025-04-13",
          Department: departments[3]._id
        }

      ]);

      console.log("✅ 4 Employees inserted");


      // ================= SALARIES =================

      await Salary.insertMany([

        {
          employee: employees[0]._id,
          department: departments[0]._id,
          totalDeduction: "50000",
          netSalary: "450000",
          month: "January"
        },

        {
          employee: employees[1]._id,
          department: departments[1]._id,
          totalDeduction: "60000",
          netSalary: "540000",
          month: "February"
        },

        {
          employee: employees[2]._id,
          department: departments[2]._id,
          totalDeduction: "40000",
          netSalary: "360000",
          month: "March"
        },

        {
          employee: employees[3]._id,
          department: departments[3]._id,
          totalDeduction: "45000",
          netSalary: "405000",
          month: "April"
        }

      ]);

      console.log("✅ 4 Salaries inserted");

    } else {

      console.log("⚠️ Departments already exist");
      console.log("⚠️ Employees already exist");
      console.log("⚠️ Salaries already exist");
    }

  } catch (error) {

    console.log("❌ Error inserting default data");
    console.log(error);

  }
};
seedData();


// =====================================
// ROUTES
// =====================================

app.get("/", (req, res) => {
  res.send("Welcome to the Employee Management System API");
});

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/salaries", require("./routes/salaryRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));


// =====================================
// SERVER
// =====================================

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});