'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentMarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentMarks.belongsTo(models.Mark, {
        foreignKey: {
          name: 'mark_id',
          mark_id: DataTypes.INTEGER
        }
      });
      StudentMarks.belongsTo(models.Subject, {
        foreignKey: {
          name: 'subject_id',
          subject_id: DataTypes.INTEGER
        }
      });
      StudentMarks.belongsTo(models.Semester, {
        foreignKey: {
          name: 'semester_id',
          semester_id: DataTypes.INTEGER
        }
      });
    }
  };
  StudentMarks.init({
    student_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    mark_id: DataTypes.INTEGER,
    semester_id: DataTypes.INTEGER,
    grade_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  },
    {
      sequelize,
      modelName: 'StudentMarks',
      tableName: 'student_marks'
    });
  return StudentMarks;
};