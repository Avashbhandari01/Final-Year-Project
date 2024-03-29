var db = require("../dbconfig/dbConfig");
var Parent = db.parent;
const bcrypt = require("bcryptjs");

var registerParent = async (req, res) => {
  const { firstName, lastName, email, password, address, contact, relation } =
    req.body;
  try {
    const oldUser = await Parent.findOne({ where: { email } });
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (oldUser) {
      return res.send({ error: "Parent already exists!" });
    }

    await Parent.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      address,
      contact,
      relation,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send(error);
  }
};

var parentTable = async (req, res) => {
  try {
    Parent.findAll().then((data) => {
      res.send({ data: data });
    });
  } catch (error) {
    res.send(error);
  }
};

var parentData = async (req, res) => {
  const { parent_ID } = req.body;
  try {
    const data = await Parent.findAll({ where: { parent_ID } });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

var parentCount = async (req, res) => {
  try {
    Parent.count().then((count) => {
      res.send(`${count}`);
    });
  } catch (error) {}
};

module.exports = {
  registerParent,
  parentTable,
  parentData,
  parentCount,
};
