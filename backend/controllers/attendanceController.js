var db = require('../dbconfig/dbConfig')
var Attendance = db.attendance
var Student = db.student

var insertAttendance = async (req, res) => {
    try {
        await Attendance.create({
            month: 'March',
            year: '2023',
            totalDays: '23',
            daysPresent: '14',
            daysAbsent: '9',
            attendancePercentage: '61%',
            student_Id: 1
        })
        res.send({ status: "ok" })
    } catch (error) {
        res.send(error)
    }
}

const getAttendance = async (req, res) => {
    try {
        const { student_Id, year, month } = req.body;
        if (year && month) {
            const data = await Attendance.findAll({
                attributes: ['attendance_ID', 'month', 'year', 'totalDays', 'daysPresent', 'daysAbsent', "attendancePercentage"],
                include: [{
                    model: Student,
                    as: 'studentAttendanceDetails',
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
    insertAttendance,
    getAttendance
}