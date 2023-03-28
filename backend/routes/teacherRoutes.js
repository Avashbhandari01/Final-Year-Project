const express = require("express");
const router = express.Router();
const {
  registerTeacher,
  teacherTable,
  teacherData,
} = require("../controllers/teacherController");

router.post("/teacher-register", registerTeacher);
router.get("/teacher-table", teacherTable);
router.post("/teacher-data", teacherData);

module.exports = router;
