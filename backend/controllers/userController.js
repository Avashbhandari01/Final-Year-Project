var db = require("../dbconfig/dbConfig");
// var User = db.user
var Student = db.student;
var Parent = db.parent;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const JWT_SECRET = process.env.JWT_SECRET;

var registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    contact,
    gender,
    dob,
    parentfirstName,
    parentlastName,
    parentEmail,
    parentPassword,
    parentAddress,
    parentContact,
    parentRelation,
  } = req.body;
  try {
    const oldStudent = await Student.findOne({ where: { email } });
    const oldParent = await Parent.findOne({ where: { email: parentEmail } });

    if (oldStudent) {
      return res.send({ error: "Student already exists" });
    }

    if (oldParent) {
      return res.send({ error: "Parent already exists" });
    }

    const encryptedStudentPassword = await bcrypt.hash(password, 10);
    const encryptedParentPassword = await bcrypt.hash(parentPassword, 10);

    var parentData = await Parent.create({
      firstName: parentfirstName,
      lastName: parentlastName,
      email: parentEmail,
      password: encryptedParentPassword,
      address: parentAddress,
      contact: parentContact,
      relation: parentRelation,
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
        parent_Id: parentData.parent_ID,
      });
    }

    res.send({ status: "ok" });
  } catch (error) {
    res.send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!["Parent", "Student"].includes(role)) {
    return res.json({ error: "Invalid role!" });
  }

  try {
    if (role === "Parent") {
      const parentUser = await Parent.findOne({ where: { email } });
      if (!parentUser) {
        return res.json({ error: "User doesn't exist!" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        parentUser.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          { email: parentUser.email },
          process.env.JWT_SECRET,
          {
            expiresIn: 3600,
          }
        );
        const username = parentUser.firstName;
        try {
          const response = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            {
              headers: {
                "private-key": "ea5d4d65-d4f4-4cff-8a89-b95beddb1923",
              },
            }
          );
          return res.status(response.status).json({
            status: "ok",
            token: token,
            data: parentUser,
          });
        } catch (error) {
          return res.status(400).json(error);
        }
      } else {
        return res.json({ status: "error", error: "Invalid Password!" });
      }
    }

    if (role === "Student") {
      const studentUser = await Student.findOne({ where: { email } });
      if (!studentUser) {
        return res.json({ error: "User doesn't exist!" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        studentUser.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          { email: studentUser.email },
          process.env.JWT_SECRET,
          {
            expiresIn: 3600,
          }
        );
        const username = studentUser.firstName;
        try {
          const response = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            {
              headers: {
                "private-key": "ea5d4d65-d4f4-4cff-8a89-b95beddb1923",
              },
            }
          );
          return res.status(response.status).json({
            status: "ok",
            token: token,
            data: studentUser,
          });
        } catch (error) {
          return res.status(400).json(error);
        }
      } else {
        return res.json({ status: "error", error: "Invalid Password!" });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = loginUser;

// var userData = async (req, res) => {
//     const { token } = req.body;
//     try {
//         const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//             if (err) {
//                 return "token expired";
//             }
//             return res;
//         })
//         console.log(user);
//         if (user == "token expired") {
//             return res.send({ status: "error", data: "token expired" })
//         }

//         const useremail = user.email;
//         User.findOne({ where: { email: useremail } }).then((data) => {
//             res.send({ status: "ok", data: data })
//         }).catch((error) => {
//             res.send({ status: "error", data: error })
//         })
//     } catch (error) { }
// }

// var userDetails = async (req, res) => {
//     const email = req.body
//     try {
//         User.findOne({ where: { email } }).then((data) => {
//             res.send({ data: data })
//         })

//     } catch (error) {
//         res.send(error);
//     }
// }

// var userTable = async (req, res) => {
//     try {
// User.findAll({}).then((data) => {
//     res.send({ data: data })
// })

//     } catch (error) {
//         res.send(error);
//     }
// }

module.exports = {
  registerUser,
  loginUser,
  // userData,
  // userDetails,
  // userTable
};
