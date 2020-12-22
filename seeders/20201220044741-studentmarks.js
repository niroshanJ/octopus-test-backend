'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let rowCount = 10000000;
    let bulkCount = rowCount / 100000;
    // // const rowCount = 1000000;
    // // const bulkCount = rowCount / 10000;

    const generateRandomNumberInRange = (min, max) => {
      return Math.floor(Math.random() * (1 + max - min)) + min;
    }

    const asyncDataGeneration = async (index, bulkData) => {
      let studentId = generateRandomNumberInRange(1, 20);
      let subjectId = generateRandomNumberInRange(1, 20);
      let semesterId = generateRandomNumberInRange(1, 20);
      let gradeId = generateRandomNumberInRange(1, 10);
      let marksId = generateRandomNumberInRange(1, 12);

      return {
        student_id: studentId,
        subject_id: subjectId,
        semester_id: semesterId,
        grade_id: gradeId,
        mark_id: marksId,
        status: 0
      };
    }


    let bulkData = [];
    let bulkIndex = 0;
    for (let i = 0; i < rowCount; i++) {
      bulkIndex++;
      let studentMarkRow = asyncDataGeneration(i, bulkData);
      bulkData.push(studentMarkRow);
      if (bulkIndex === bulkCount) {
        console.log('Seeding student marks data ', `${(parseFloat((i / rowCount)) * 100).toFixed(2)}%`);
        bulkIndex = 0;
        let insertingBulkData = await Promise.all(bulkData);
        await queryInterface.bulkInsert('student_marks', insertingBulkData, {});
        bulkData = [];
      }
    }

    let studentId = 0;
    let subjectId = 0;
    let semesterId = 0;
    let gradeId = 0;
    let marksId = 0;
    let rows = [];
    for (let i = 0; i < 20; i++) {
      studentId = i + 1;
      for (let j = 0; j < 20; j++) {
        subjectId = j + 1;
        rows.push({
          student_id: studentId,
          subject_id: subjectId,
          semester_id: generateRandomNumberInRange(1, 20),
          grade_id: generateRandomNumberInRange(1, 10),
          mark_id: generateRandomNumberInRange(1, 12),
          status: 1
        });
      }
      console.log(`Inserting`, `${(parseFloat((i / 20)) * 100).toFixed(2)}%`);
      console.log('inserting....');
      await queryInterface.bulkInsert('student_marks', rows, {});
      rows = [];
      console.log('inserted');
    }

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
