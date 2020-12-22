'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const grades = [];
    for (let i = 1; i < 13; i++) {
      grades.push({ grade: 'Grade ' + i });
    }
    await queryInterface.bulkInsert('Grades', grades, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Grades', null, {});
  }
};
