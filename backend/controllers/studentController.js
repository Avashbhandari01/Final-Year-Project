var db = require("../dbconfig/dbConfig");
var Student = db.student;
var Parent = db.parent;
const bcrypt = require("bcryptjs");

var registerStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    contact,
    gender,
    dob,
    group,
    P_firstName,
    P_lastName,
    P_email,
    P_password,
    P_address,
    P_contact,
    P_relation,
  } = req.body;
  try {
    const oldStudent = await Student.findOne({ where: { email } });
    const oldParent = await Parent.findOne({ where: { P_email } });

    if (oldStudent) {
      return res.send({ error: "Student already exists" });
    }

    if (oldParent) {
      return res.send({ error: "Parent already exists" });
    }

    const encryptedStudentPassword = await bcrypt.hash(password, 10);
    const encryptedParentPassword = await bcrypt.hash(P_password, 10);

    var parentData = await Parent.create({
      P_firstName,
      P_lastName,
      P_email,
      P_password: encryptedParentPassword,
      P_address,
      P_contact,
      P_relation,
    });

    if (parentData && parentData.parent_ID) {
      await Student.create({
        firstName,
        lastName,
        email,
        password: encryptedStudentPassword,
        address,
        contact,
        gender,
        dob,
        group,
        parent_Id: parentData.parent_ID,
      });
    }

    res.send({ status: "ok" });
  } catch (error) {
    res.send(error);
  }
};

var studentTable = async (req, res) => {
  try {
    Student.findAll().then((data) => {
      res.send({ data: data });
    });
  } catch (error) {
    res.send(error);
  }
};

var studentData = async (req, res) => {
  const { student_ID } = req.body;
  try {
    const data = await Student.findAll({ where: { student_ID } });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

var studentCount = async (req, res) => {
  try {
    Student.count().then((count) => {
      res.send(`${count}`);
    });
  } catch (error) {}
};

module.exports = {
  registerStudent,
  studentTable,
  studentData,
  studentCount,
};
