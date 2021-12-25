const express = require("express");
const {
  registerEmployee,
  getEmployee,
  updateEmployee,
  updateBulkEmployee,
  deleteEmployees,
  deleteBulkEmployees,
} = require("../Controller/EmployeesController");
const router = express.Router();
router.post("/createEmployees", registerEmployee);
router.get("/getEmployees/:id", getEmployee);
router.put("/updateEmployees/:id", updateEmployee);
router.put("/updateBulkEmployees", updateBulkEmployee);
router.delete("/deleteEmployees/:id", deleteEmployees);
router.delete("/deleteBulkEmployees", deleteBulkEmployees);

module.exports = router;
