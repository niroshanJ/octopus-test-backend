'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const semesters = [];
    for (let i = 2010; i <= 2020; i++) {
      semesters.push({ semester: 'Semester  1', year: i });
      semesters.push({ semester: 'Semester  2', year: i });
    }
    await queryInterface.bulkInsert('Semesters', semesters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Semesters', null, {});
  }
};
