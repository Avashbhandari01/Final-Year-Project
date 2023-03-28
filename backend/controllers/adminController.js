var db = require("../dbconfig/dbConfig");
var Admin = db.admin;
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const password = process.env.PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

var registerAdmin = async (req, res) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  await Admin.create({
    username: "admin",
    email: "admin@gmail.com",
    password: encryptedPassword,
    isAdmin: true,
  });
  res.status(200).json({ data: "Admin has been added!" });
};

var loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all the fields!");
  }

  const admin = await Admin.findOne({ where: { email } });

  if (!admin) {
    return res.json({ error: "Admin doesn't exist!" });
  }

  if (await bcrypt.compare(password, admin.password)) {
    const token = jwt.sign({ email: admin.email }, JWT_SECRET, {
      expiresIn: 3600,
    });
    const username = "admin";
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
        data: admin,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  } else {
    return res.json({ status: "error", error: "Invalid Password!" });
  }
};

var adminData = async (req, res) => {
  const { token } = req.body;
  try {
    const admin = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(admin);
    if (admin == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const adminemail = admin.email;
    Admin.findOne({ where: { email: adminemail } })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
};

var adminDetails = async (req, res) => {
  try {
    Admin.findAll({}).then((data) => {
      res.send({ data: data });
    });
  } catch (error) {
    res.send(error);
  }
};

var adminCount = async (req, res) => {
  try {
    Admin.count().then((count) => {
      res.send(`${count}`);
    });
  } catch (error) {}
};

module.exports = {
  registerAdmin,
  loginAdmin,
  adminData,
  adminDetails,
  adminCount,
};
