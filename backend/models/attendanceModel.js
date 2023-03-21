module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
        // Model attributes are defined here
        attendance_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalDays: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        daysPresent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        daysAbsent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attendancePercentage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        student_Id: DataTypes.INTEGER
    }, {
        // Other model options go here
        tableName: 'tbl_Attendance'
    });
    return Attendance;
}