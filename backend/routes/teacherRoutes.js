const express = require("express");
const router = express.Router();
const { registerTeacher } = require("../controllers/teacherController");

router.post("/teacher-register", registerTeacher);

module.exports = router;
