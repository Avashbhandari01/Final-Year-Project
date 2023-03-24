const express = require("express");
const router = express.Router();
const {
  insertFee,
  getFee,
  parentFee,
  allFee,
} = require("../controllers/feeController");

router.post("/insert-fee", insertFee);
router.post("/get-fee", getFee);
router.post("/parent-fee", parentFee);
router.get("/all-fee", allFee);

module.exports = router;
