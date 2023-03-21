var db = require('../dbconfig/dbConfig')
var Assignment = db.assignment

var getAssignment = async (req, res) => {
    const assignment = await Assignment.findAll()
    res.status(200).json(assignment)
}

var createAssignment = async (req, res) => {
    if (!req.body.title && !req.body.description && !req.body.deadline) {
        res.status(400)
        throw new Error('Please add a text field!')
    }

    const assignment = await Assignment.create({
        assignmentTitle: req.body.title,
        assignmentDescription: req.body.description,
        submissionDate: req.body.deadline
    })
    res.status(200).json(assignment)
}

var updateAssignment = async (req, res) => {
    try {
        const updateAssignment = await Assignment.update({
            assignmentTitle: req.body.title,
            assignmentDescription: req.body.description,
            submissionDate: req.body.deadline
        }, {
            where: {
                assignment_ID: req.params.id
            }
        }
        )

        res.status(200).json('Updated!')
    }
    catch (error) {
        res.status(400).json(error);
    }
}

var deleteAssignment = async (req, res) => {
    try {
        const result = await Assignment.destroy({
          where: {
            assignment_ID: req.params.id
          }
        });
        res.status(200).json({ message: "Assignment deleted successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
}

module.exports = {
    getAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment
}