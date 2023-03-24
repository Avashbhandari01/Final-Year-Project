const express = require("express");
const router = express.Router();
const {
  insertAttendance,
  getAttendance,
  parentAttendance,
} = require("../controllers/attendanceController");

router.post("/insert-attendance", insertAttendance);
router.post("/get-attendance", getAttendance);
router.post("/parent-attendance", parentAttendance);

module.exports = router;
