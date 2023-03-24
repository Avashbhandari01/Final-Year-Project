var db = require("../dbconfig/dbConfig");
var Attendance = db.attendance;
var Student = db.student;

var insertAttendance = async (req, res) => {
  try {
    await Attendance.create({
      month: "April",
      year: "2023",
      totalDays: "23",
      daysPresent: "18",
      daysAbsent: "5",
      attendancePercentage: "78%",
      student_Id: 2,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send(error);
  }
};

const getAttendance = async (req, res) => {
  try {
    const { student_ID, year, month } = req.body;
    if (year && month) {
      const data = await db.sequelize.query(
        `SELECT s.firstName, s.lastName, s.email, s.contact, a.attendance_ID, a.month, a.year, a.totalDays, a.daysPresent, a.daysAbsent, a.attendancePercentage
        FROM tbl_Students s
        JOIN tbl_Attendance a ON s.student_ID = a.student_Id
        WHERE s.student_ID = :student_ID and a.month = :month and a.year = :year`,
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

var parentAttendance = async (req, res) => {
  try {
    const { parent_ID, year, month } = req.body;

    if (year && month) {
      const data = await db.sequelize.query(
        `SELECT s.firstName, s.lastName, s.email, s.contact, a.attendance_ID, a.month, a.year, a.totalDays, a.daysPresent, a.daysAbsent, a.attendancePercentage
        FROM tbl_Students s
        INNER JOIN tbl_Attendance a ON s.student_ID = a.student_Id
        INNER JOIN tbl_Parents p ON s.parent_Id = p.parent_ID
        WHERE p.parent_ID = :parent_ID AND a.year = :year AND a.month = :month`,
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

var allAttendance = async (req, res) => {
  try {
    const data = await Attendance.findAll({
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
  insertAttendance,
  getAttendance,
  parentAttendance,
  allAttendance,
};
