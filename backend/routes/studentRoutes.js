const express = require("express");
const router = express.Router();
const {
  registerStudent,
  studentTable,
  studentData,
} = require("../controllers/studentController");

router.post("/student-register", registerStudent);
router.get("/student-table", studentTable);
router.post("/student-data", studentData);

module.exports = router;
