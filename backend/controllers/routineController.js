const { Sequelize } = require('sequelize')
var db = require('../dbconfig/dbConfig')

var routine = async (req, res) => {
    const sqlQuery = 'Select * from dbo.Routine';
    db.sequelize.query(sqlQuery, {
        type: Sequelize.QueryTypes.SELECT
    }).then(results => {
        res.json(results);
    }).catch(error => {
        console.error(error);
        res.status(500).send('An error occurred');
    });
}

module.exports = {
    routine
}