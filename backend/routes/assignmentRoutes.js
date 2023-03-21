const express = require('express')
const router = express.Router()
const { getAssignment, createAssignment, updateAssignment, deleteAssignment  } = require('../controllers/assignmentController')

router.get('/get-assignment', getAssignment)
router.post('/create-assignment', createAssignment)
router.put('/update-assignment/:id', updateAssignment)
router.delete('/delete-assignment/:id', deleteAssignment)

module.exports = router