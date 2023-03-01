var db = require('../dbconfig/dbConfig')
var User = db.user
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

var registerUser = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password, role } = req.body
    try {
        const oldUser = await User.findOne({ where: { email } })
        const encryptedPassword = await bcrypt.hash(password, 10)


        if (oldUser) {
            return res.send({ error: "User already exists" })
        }

        await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: encryptedPassword,
            role
        })
        res.send({ status: "ok" })
    } catch (error) {
        res.send(error)
    }
}

var loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    const user = await User.findOne({ where: { email } })

    if (!user) {
        return res.json({ error: "User doesn't exist!" })
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: 3600,
        })

        if (res.status(201)) {
            return res.json({ status: "ok", token: token, data: user });
        } else {
            return res.json({ error: "error" })
        }
    }
    res.json({ status: "error", error: "Invalid Password!" })

}

var userData = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        })
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" })
        }

        const useremail = user.email;
        User.findOne({ where: { email: useremail } }).then((data) => {
            res.send({ status: "ok", data: data })
        }).catch((error) => {
            res.send({ status: "error", data: error })
        })
    } catch (error) { }
}

var userDetails = async (req, res) => {
    const email = req.body
    try {
        User.findOne({where: {email}}).then((data) => {
            res.send({data: data})
        })
        
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    userData,
    userDetails
}