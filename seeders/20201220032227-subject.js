'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const promises = [];
    let subjects = [];
    for (let i = 0; i < 20; i++) {
      subjects.push({ subject: `Subject ${i + 1}` });
    }
    console.log(`Insert subjects`);
    promises.push(queryInterface.bulkInsert('Subjects', subjects, {}));
    await Promise.all(promises);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subjects', null, {});
  }
};
