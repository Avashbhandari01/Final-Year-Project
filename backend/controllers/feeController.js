var db = require('../dbconfig/dbConfig')
var Fee = db.fee

var insertFee = async (req, res) => {
    try {
        await Fee.create({
            month: 'March',
            year: '2023',
            fileName: "C:/Users/DELL/Desktop/Guardian Portal System/Import Fee Details/HarishMarch.csv",
            student_Id: 1
        })
        res.send({ status: "ok" })
    } catch (error) {
        res.send(error)
    }
}

var getFee = async (req, res) => {
    try {
        const { student_Id, year, month } = req.body;
        if (year) {
            if (month) {
                Fee.findAll({ where: { student_Id, year, month } }).then((data) => {
                    res.send({ data: data })
                })
            } else {
                Fee.findAll({ where: { student_Id, year } }).then((data) => {
                    res.send({ data: data })
                })
            }
        } else {
            Fee.findAll({ where: { student_Id } }).then((data) => {
                res.send({ data: data })
            })
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    insertFee,
    getFee
}