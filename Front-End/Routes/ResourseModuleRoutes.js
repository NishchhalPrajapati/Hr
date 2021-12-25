const express = require("express");
const {
  createBulkResourse,
  addResourse,
  editResourse,
  deleteResourse,
  readResourse,
} = require("../Controller/ResourseModuleController");
const router = express.Router();

router.get("/readResourseModule/:id", readResourse);
router.post("/createResourseModule", createBulkResourse);
router.post("/addResourseModule", addResourse);
router.put("/editResourseModule/:id", editResourse);
router.delete("/deleteResourseModule/:id", deleteResourse);
module.exports = router;
