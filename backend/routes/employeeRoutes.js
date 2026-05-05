const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

router.post("/create-employee", controller.createEmployee);
router.get("/get-employee", controller.getEmployees);

module.exports = router;