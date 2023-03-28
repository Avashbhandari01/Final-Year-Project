const express = require("express");
const router = express.Router();
const {
  registerStudent,
  studentTable,
  studentData,
  studentCount,
} = require("../controllers/studentController");

router.post("/student-register", registerStudent);
router.get("/student-table", studentTable);
router.post("/student-data", studentData);
router.get("/student-count", studentCount);

module.exports = router;
