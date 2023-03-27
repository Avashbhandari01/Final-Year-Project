const express = require("express");
const router = express.Router();
const { routine } = require("../controllers/routineController");

router.get("/get-routine", routine);

module.exports = router;
