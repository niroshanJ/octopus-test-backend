'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let marks = [
      {
        "mark": "A+",
        "score": 90
      },
      {
        "mark": "A",
        "score": 80
      },
      {
        "mark": "A-",
        "score": 75
      },
      {
        "mark": "B+",
        "score": 70
      },
      {
        "mark": "B",
        "score": 65
      },
      {
        "mark": "B-",
        "score": 60
      },
      {
        "mark": "C+",
        "score": 55
      },
      {
        "mark": "C",
        "score": 45
      },
      {
        "mark": "C-",
        "score": 40
      },
      {
        "mark": "D+",
        "score": 35
      },
      {
        "mark": "D",
        "score": 30
      },
      {
        "mark": "D-",
        "score": 25
      }
    ];
    await queryInterface.bulkInsert('Marks', marks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Marks', null, {});
  }
};
