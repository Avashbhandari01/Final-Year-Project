var db = require("../dbconfig/dbConfig");
var Teacher = db.teacher;
const bcrypt = require("bcryptjs");

var registerTeacher = async (req, res) => {
  const { firstName, lastName, email, password, address, contact, department } =
    req.body;
  try {
    const oldUser = await Teacher.findOne({ where: { email } });
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (oldUser) {
      return res.send({ error: "Parent already exists!" });
    }

    const data = await Teacher.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      address,
      contact,
      department,
    });
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.send(error);
  }
};

var teacherTable = async (req, res) => {
  try {
    Teacher.findAll().then((data) => {
      res.send({ data: data });
    });
  } catch (error) {
    res.send(error);
  }
};

var teacherData = async (req, res) => {
  const { teacher_ID } = req.body;
  try {
    const data = await Teacher.findAll({ where: { teacher_ID } });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

var teacherCount = async (req, res) => {
  try {
    Teacher.count().then((count) => {
      res.send(`${count}`);
    });
  } catch (error) {}
};

module.exports = {
  registerTeacher,
  teacherTable,
  teacherData,
  teacherCount,
};
