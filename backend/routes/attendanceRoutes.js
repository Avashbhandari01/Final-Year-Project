const express = require("express");
const router = express.Router();
const {
  insertAttendance,
  getAttendance,
  parentAttendance,
  allAttendance,
  getFullAttendance,
} = require("../controllers/attendanceController");

router.post("/insert-attendance", insertAttendance);
router.post("/get-attendance", getAttendance);
router.post("/parent-attendance", parentAttendance);
router.get("/all-attendance", allAttendance);
router.get("/full-attendance", getFullAttendance);

module.exports = router;
