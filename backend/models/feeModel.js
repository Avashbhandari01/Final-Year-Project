module.exports = (sequelize, DataTypes) => {
    const Fee = sequelize.define('Fee', {
        // Model attributes are defined here
        fee_ID: {
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
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        student_Id: DataTypes.INTEGER
    }, {
        // Other model options go here
        tableName: 'tbl_FeeDetails'
    });
    return Fee;
}