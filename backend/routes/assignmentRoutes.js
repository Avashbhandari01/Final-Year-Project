const express = require("express");
const router = express.Router();
const {
  getAllAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getGroupAssignment,
  getParentAssignment,
} = require("../controllers/assignmentController");

router.get("/get-assignment", getAllAssignment);
router.post("/get-groupassignment", getGroupAssignment);
router.post("/get-parentassignment", getParentAssignment);
router.post("/create-assignment", createAssignment);
router.put("/update-assignment/:id", updateAssignment);
router.delete("/delete-assignment/:id", deleteAssignment);

module.exports = router;
