const Sequelize = require('sequelize');
const tedious = require('tedious');

const config = {
    dialect: 'mssql',
    dialectModule: tedious,
    host: 'localhost',
    username: 'sa',
    password: 'avash@123',
    database: 'SequelizeDB',
    port: 1433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const sequelize = new Sequelize(config);
module.exports = sequelize;