const express = require("express");
const router = express.Router();
const {
  createAttachmentFile,
  readAttachmentFile,
  deleteAttachmentFile,
  updateAttachmentFile,
  updateBulkAttachmentFile,
  deleteBulkAttachmentFile,
} = require("../Controller/EmployeeAttachementController");
router.post("/createEmployeeAttechment", createAttachmentFile);
router.get("/readEmployeeAttechment/:id", readAttachmentFile);
router.put("/updateEmployeeAttechment/:id", updateAttachmentFile);
router.delete("/deleteEmployeeAttechment/:id", deleteAttachmentFile);
router.put("/updateBulkEmployeeAttechment", updateBulkAttachmentFile);
router.delete("/deleteBulkEmployeeAttechment", deleteBulkAttachmentFile);
module.exports = router;
