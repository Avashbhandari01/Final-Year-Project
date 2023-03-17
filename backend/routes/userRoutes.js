const express = require('express')
const router = express.Router()
const { registerUser, loginUser, userData, userDetails, userTable } = require('../controllers/userController')

router.post('/user-register', registerUser)
router.post('/user-login', loginUser)
// router.post('/userData', userData)
// router.get('/user-details', userDetails)
// router.get('/user-table', userTable)

module.exports = router