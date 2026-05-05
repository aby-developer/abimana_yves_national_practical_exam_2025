const Salary = require("../models/Salary");

// CREATE
exports.createSalary = async (req, res) => {
  const salary = await Salary.create(req.body);
  res.status(201).json(salary);
};

// GET
exports.getSalaries = async (req, res) => {
  const data = await Salary.find();
  res.status(200).json(data);
};

// UPDATE
exports.updateSalary = async (req, res) => {
  const id = req.params.id;
  const updated = await Salary.findByIdAndUpdate(id, req.body, { new: true });
  res.status(201).json(updated);
};

// DELETE
exports.deleteSalary = async (req, res) => {
  const id = req.params.id;
  await Salary.findByIdAndDelete(id);
  res.status(200).json({ message: "Salary deleted" });
};

exports.getMonthlyReport = async (req, res) => {
  try {
    const report = await Salary.aggregate([
      // Join Employee
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employee"
        }
      },

      { $unwind: "$employee" },

      // Join Department
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department"
        }
      },

      { $unwind: "$department" },

      // Select needed fields
      {
        $project: {
          _id: 0,
          FirstName: "$employee.FirstName",
          LastName: "$employee.LastName",
          Position: "$employee.Position",
          DepartmentName: "$department.DepartmentName",
          netSalary: 1,
          month: 1
        }
      }

    ]);

    res.json(report);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};