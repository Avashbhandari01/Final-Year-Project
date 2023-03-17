var db = require('../dbconfig/dbConfig')
var User = db.user
var Student = db.student
var Parent = db.parent
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

var registerUser = async (req, res) => {
    const { firstName, lastName, email, password, address, contact, gender, dob,
        parentfirstName, parentlastName, parentEmail, parentPassword, parentAddress, parentContact, parentRelation
    } = req.body;
    try {
        const oldStudent = await Student.findOne({ where: { email } })
        const oldParent = await Parent.findOne({ where: { email: parentEmail  } })

        if (oldStudent) {
            return res.send({ error: "Student already exists" })
        }

        if (oldParent) {
            return res.send({ error: "Parent already exists" })
        }

        const encryptedStudentPassword = await bcrypt.hash(password, 10)
        const encryptedParentPassword = await bcrypt.hash(parentPassword, 10)

        var parentData = await Parent.create({
            firstName: parentfirstName,
            lastName: parentlastName,
            email: parentEmail,
            password: encryptedParentPassword,
            address: parentAddress,
            contact: parentContact,
            relation: parentRelation
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
                parent_Id: parentData.parent_ID
            });
        }

        res.send({ status: "ok" })
    }
    catch (error) {
        res.send(error)
    }
}

var loginUser = async (req, res) => {
    const { email, password, role } = req.body;


    if (!['Parent', 'Student'].includes(role)) {
        return res.json({ error: "Invalid role!" });
    }

    try {
        const P_email = email;
        const P_password = password;
        if (role == 'Parent') {

            const ParentUser = await Parent.findOne({ where: { email } })
            if (!ParentUser) {
                return res.json({ error: "User doesn't exist!" })
            }

            if (await bcrypt.compare(password, ParentUser.password)) {
                const token = jwt.sign({ email: ParentUser.email }, JWT_SECRET, {
                    expiresIn: 3600,
                })

                if (res.status(201)) {
                    return res.json({ status: "ok", token: token, data: ParentUser });
                } else {
                    return res.json({ error: "error" })
                }
            }
            res.json({ status: "error", error: "Invalid Password!" })
        }
    }
    catch (error) {
        res.send(error);
    }

    try {
        if (role == 'Student') {

            const StudentUser = await Student.findOne({ where: { email } })

            if (!StudentUser) {
                return res.json({ error: "User doesn't exist!" })
            }

            if (await bcrypt.compare(password, StudentUser.password)) {
                const token = jwt.sign({ email: StudentUser.email }, JWT_SECRET, {
                    expiresIn: 3600,
                })

                if (res.status(201)) {
                    return res.json({ status: "ok", token: token, data: StudentUser });
                } else {
                    return res.json({ error: "error" })
                }
            }
            res.json({ status: "error", error: "Invalid Password!" })
        }
    }
    catch (error) {
        res.send(error);
    }
}

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
//         User.findAll({}).then((data) => {
//             res.send({ data: data })
//         })

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
}