const express = require('express')
const router = express.Router()
const { registerAdmin, loginAdmin, adminData, adminDetails } = require('../controllers/adminController')

router.post('/admin-register', registerAdmin)
router.post('/admin-login', loginAdmin)
router.post('/adminData', adminData)
router.get('/admin-details', adminDetails)

module.exports = router