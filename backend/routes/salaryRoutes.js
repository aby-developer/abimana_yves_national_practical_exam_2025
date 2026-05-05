const express = require("express");
const router = express.Router();
const controller = require("../controllers/salaryController");

router.post("/create-salary", controller.createSalary);
router.get("/get-salaries", controller.getSalaries);
router.put("/update-salary/:id", controller.updateSalary);
router.delete("/delete-salary/:id", controller.deleteSalary);
router.get("/report", controller.getMonthlyReport);
module.exports = router;