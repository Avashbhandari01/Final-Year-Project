const express = require('express')
const router = express.Router()
const { insertFee, getFee } = require('../controllers/feeController')

router.post('/insert-fee', insertFee)
router.post('/get-fee', getFee)

module.exports = router