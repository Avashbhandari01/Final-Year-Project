var db = require("../dbconfig/dbConfig");
var Fee = db.fee;
var Student = db.student;

var insertFee = async (req, res) => {
  try {
    await Fee.create({
      month: "April",
      year: "2023",
      total: "70000",
      student_Id: 2,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send(error);
  }
};

const getFee = async (req, res) => {
  try {
    const { student_ID, year, month } = req.body;
    if (year && month) {
      const data = await db.sequelize.query(
        `SELECT s.student_ID, s.firstName, s.lastName, s.email, s.contact, f.month, f.year, f.total
        FROM tbl_Students s
        INNER JOIN tbl_Fee f ON s.student_ID = f.student_Id
        WHERE s.student_ID = :student_ID AND f.year = :year AND f.month = :month`,
        {
          replacements: { student_ID, year, month },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json({ data });
    } else if (year && !month) {
      res.status(400).send("Please select the month!");
    } else {
      res.status(400).send("Please select the year!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const parentFee = async (req, res) => {
  try {
    const { parent_ID, year, month } = req.body;

    if (year && month) {
      const data = await db.sequelize.query(
        `SELECT s.student_ID, s.firstName, s.lastName, s.email, s.contact, f.month, f.year, f.total
        FROM tbl_Students s
        INNER JOIN tbl_Fee f ON s.student_ID = f.student_Id
        INNER JOIN tbl_Parents p ON s.parent_Id = p.parent_ID
        WHERE p.parent_ID = :parent_ID AND f.year = :year AND f.month = :month`,
        {
          replacements: { parent_ID, year, month },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json({ data });
    } else if (year && !month) {
      res.status(400).send("Please select the month!");
    } else {
      res.status(400).send("Please select the year!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

var allFee = async (req, res) => {
  try {
    const data = await Fee.findAll({
      include: [
        {
          model: Student,
          attributes: ["firstName"], // include only the name attribute from the Student table
        },
      ],
    });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  insertFee,
  getFee,
  parentFee,
  allFee,
};
