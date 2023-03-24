const express = require("express");
const router = express.Router();
const {
  registerStudent,
  studentTable,
} = require("../controllers/studentController");

router.post("/student-register", registerStudent);
router.get("/student-table", studentTable);

module.exports = router;
