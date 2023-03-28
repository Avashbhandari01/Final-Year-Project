const express = require("express");
const router = express.Router();
const {
  registerParent,
  parentTable,
  parentData,
  parentCount,
} = require("../controllers/parentController");

router.post("/parent-register", registerParent);
router.get("/parent-table", parentTable);
router.post("/parent-data", parentData);
router.get("/parent-count", parentCount);

module.exports = router;
