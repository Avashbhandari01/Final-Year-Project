const express = require('express')
const router = express.Router()
const { insertAttendance, getAttendance } = require('../controllers/attendanceController')

router.post('/insert-attendance', insertAttendance)
router.post('/get-attendance', getAttendance)

module.exports = router