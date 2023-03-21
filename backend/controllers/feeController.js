var db = require('../dbconfig/dbConfig')
var Fee = db.fee
var Student = db.student

var insertFee = async (req, res) => {
    try {
        await Fee.create({
            month: 'March',
            year: '2023',
            total: '132000',
            student_Id: 1
        })
        res.send({ status: "ok" })
    } catch (error) {
        res.send(error)
    }
}

const getFee = async (req, res) => {
    try {
        const { student_Id, year, month } = req.body;
        if (year && month) {
            const data = await Fee.findAll({
                attributes: ['fee_ID', 'month', 'year', 'total'],
                include: [{
                    model: Student,
                    as: 'studentDetails',
                    attributes: ['firstName', 'lastName', 'email', 'contact']
                }],
                where: { student_Id, year, month }
            });
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

module.exports = {
    insertFee,
    getFee
}