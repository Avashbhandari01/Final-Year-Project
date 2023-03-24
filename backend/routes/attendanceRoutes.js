const express = require("express");
const router = express.Router();
const {
  insertAttendance,
  getAttendance,
  parentAttendance,
  allAttendance,
} = require("../controllers/attendanceController");

router.post("/insert-attendance", insertAttendance);
router.post("/get-attendance", getAttendance);
router.post("/parent-attendance", parentAttendance);
router.get("/all-attendance", allAttendance);

module.exports = router;
