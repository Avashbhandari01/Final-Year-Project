const express = require('express')
const router = express.Router()
const { registerParent } = require('../controllers/parentController')

router.post('/parent-register', registerParent)

module.exports = router