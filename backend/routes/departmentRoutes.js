const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentController");

router.post("/create-department", controller.createDepartment);
router.get("/get-departments", controller.getDepartments);

module.exports = router;