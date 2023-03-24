const express = require("express");
const router = express.Router();
const {
  registerParent,
  parentTable,
} = require("../controllers/parentController");

router.post("/parent-register", registerParent);
router.get("/parent-table", parentTable);

module.exports = router;
