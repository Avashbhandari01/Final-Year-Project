var db = require('../dbconfig/dbConfig')
var Parent = db.parent
const bcrypt = require('bcryptjs')

var registerParent = async (req, res) => {
    const { firstName, lastName, email, password, address, contact, relation } = req.body
    try {
        const oldUser = await Parent.findOne({ where: { email } })
        const encryptedPassword = await bcrypt.hash(password, 10)

        if (oldUser) {
            return res.send({ error: "Parent already exists!" })
        }

        await Parent.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            address,
            contact,
            relation
        })
        res.send({ status: "ok" })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    registerParent
}