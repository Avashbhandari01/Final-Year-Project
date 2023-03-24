const express = require("express");
const router = express.Router();
const {
  registerParent,
  parentTable,
  parentData,
} = require("../controllers/parentController");

router.post("/parent-register", registerParent);
router.get("/parent-table", parentTable);
router.post("/parent-data", parentData);

module.exports = router;
