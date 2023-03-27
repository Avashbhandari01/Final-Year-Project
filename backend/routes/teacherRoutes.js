const express = require("express");
const router = express.Router();
const {
  registerTeacher,
  teacherTable,
} = require("../controllers/teacherController");

router.post("/teacher-register", registerTeacher);
router.get("/teacher-table", teacherTable);

module.exports = router;
