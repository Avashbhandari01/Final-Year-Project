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

db.user = require('../models/userModel')(sequelize, DataTypes)
db.admin = require('../models/adminModel')(sequelize, DataTypes)
db.sequelize.sync({ force: false });

module.exports = db;