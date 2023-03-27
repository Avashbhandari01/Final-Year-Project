var db = require("../dbconfig/dbConfig");
var Assignment = db.assignment;

var getAllAssignment = async (req, res) => {
  const assignment = await Assignment.findAll();
  res.status(200).json(assignment);
};

var getGroupAssignment = async (req, res) => {
  const { group } = req.body;
  const assignment = await Assignment.findAll({ where: { group } });
  res.status(200).json(assignment);
};

var getParentAssignment = async (req, res) => {
  try {
    const { parent_ID } = req.body;
    const data = await db.sequelize.query(
      ` SELECT a.assignment_ID, a.assignmentTitle, a.assignmentDescription, a.[group], a.submissionDate
        FROM tbl_Assignments a
        INNER JOIN tbl_Students s ON a.[group] = s.[group]
        WHERE s.parent_ID = :parent_ID`,
      {
        replacements: { parent_ID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send(error);
  }
};

var createAssignment = async (req, res) => {
  if (
    !req.body.title &&
    !req.body.description &&
    !req.body.deadline &&
    !req.body.group
  ) {
    res.status(400);
    throw new Error("Please add a text field!");
  }

  const assignment = await Assignment.create({
    assignmentTitle: req.body.title,
    assignmentDescription: req.body.description,
    group: req.body.group,
    submissionDate: req.body.deadline,
  });
  res.status(200).json(assignment);
};

var updateAssignment = async (req, res) => {
  try {
    const updateAssignment = await Assignment.update(
      {
        assignmentTitle: req.body.title,
        assignmentDescription: req.body.description,
        submissionDate: req.body.deadline,
      },
      {
        where: {
          assignment_ID: req.params.id,
        },
      }
    );

    res.status(200).json("Updated!");
  } catch (error) {
    res.status(400).json(error);
  }
};

var deleteAssignment = async (req, res) => {
  try {
    const result = await Assignment.destroy({
      where: {
        assignment_ID: req.params.id,
      },
    });
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getGroupAssignment,
  getParentAssignment,
};
