const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('GuardianPortalDB', 'admin', 'avash@123', {
    host: 'localhost',
    logging: false,
    dialect: 'mssql'
});

try {
    sequelize.authenticate();
    console.log('Database Connected!');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require('../models/adminModel')(sequelize, DataTypes)
db.student = require('../models/studentModel')(sequelize, DataTypes)
db.parent = require('../models/parentModel')(sequelize, DataTypes)
db.fee = require('../models/feeModel')(sequelize, DataTypes)

// One to Many relationship between parent and student
db.parent.hasMany(db.student)
db.student.belongsTo(db.parent)

// One to Many relationship between student and fee
db.student.hasMany(db.fee, {foreignKey: 'student_Id', as: 'studentDetails'});
db.fee.belongsTo(db.student, {foreignKey: 'student_Id', as: 'studentDetails'});

db.sequelize.sync({ force: false });

module.exports = db;