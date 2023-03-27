module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define(
    "Assignment",
    {
      // Model attributes are defined here
      assignment_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      assignmentTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignmentDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      submissionDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      tableName: "tbl_Assignments",
    }
  );
  return Assignment;
};
