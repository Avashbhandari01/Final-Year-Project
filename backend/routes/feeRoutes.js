const express = require("express");
const router = express.Router();
const {
  insertFee,
  getFee,
  parentFee,
} = require("../controllers/feeController");

router.post("/insert-fee", insertFee);
router.post("/get-fee", getFee);
router.post("/parent-fee", parentFee);

module.exports = router;
