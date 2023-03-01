const express = require('express')
const router = express.Router()
const { registerUser, loginUser, userData, userDetails } = require('../controllers/userController')

router.post('/user-register', registerUser)
router.post('/user-login', loginUser)
router.post('/userData', userData)
router.get('/user-details', userDetails)

module.exports = router