'use strict';
const { Student, Subject, Mark, Semester, Grade, StudentMarks } = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const { removeDuplicateObjects } = require('../helper/array');
const { calculateBoxWhiskerData, average } = require('../helper/calculations');

const getMasterData = async () => {
    const students = await Student.findAll();
    const studentsArr = students.map((student, index) => {
        return { id: student.id, name: `${student.id} - ${student.firstName} ${student.lastName}` }
    });
    const subjects = await Subject.findAll();
    const mark = await Mark.findAll();
    const semester = await Semester.findAll();
    let years = semester.map((value, index) => {
        return { id: value.year, year: value.year };
    });
    removeDuplicateObjects(years, 'year');
    const grade = await Grade.findAll();
    return {
        students: studentsArr,
        subjects,
        mark,
        semester,
        grade,
        years
    };
}

const getBowChartData = async (requestBody) => {
    try {
        let where = {
            status: 1
        };
        let payload = requestBody !== undefined ? requestBody : {};
        console.log(payload, 'payload');
        let subjectWhere = {
            id: {
                [Op.gt]: 0
            }
        };
        console.log(subjectWhere, 'subjectWhere');
        if ('student' in payload && payload.student > 0) {
            where.student_id = payload.student;
        }
        if ('subject' in payload && payload.subject > 0) {
            where.subject_id = payload.subject;
            subjectWhere.id = payload.subject;
        }
        console.log(subjectWhere, 'subjectWhere');
        if ('semester' in payload && payload.semester > 0) {
            where.semester_id = payload.semester;
        }
        if ('mark' in payload && payload.mark > 0) {
            where.mark_id = payload.mark;
        }
        if ('grade' in payload && payload.grade > 0) {
            where.grade_id = payload.grade;
        }
        if ('year' in payload && payload.year > 0) {
            where['$semester.year$'] = payload.year;
        }
        const subjectData = await Subject.findAll({
            attributes: [`id`],
            raw: true,
            where: subjectWhere
        });
        let subjectIds = subjectData.map((subject, index) => {
            return subject.id
        });
        const subjectPromise = [];
        let bulkSubjectIds = [];
        const subjectCount = subjectIds.length;
        for (let i = 0; i < subjectCount; i++) {
            bulkSubjectIds.push(subjectIds[i]);
            if (bulkSubjectIds.length == 5 || subjectCount < 5) {
                where.subject_id = {
                    [Op.in]: bulkSubjectIds
                };
                const subjectMark = StudentMarks.findAll({
                    attributes: [
                        'subject_id',
                        'student_id',
                        'grade_id',
                        [Sequelize.fn('GROUP_CONCAT', Sequelize.col('score')), 'scores']
                    ],
                    where: where,
                    group: ['subject_id'],
                    include: [
                        { model: Mark },
                        { model: Subject },
                        { model: Semester }
                    ],
                    raw: true
                });
                bulkSubjectIds = [];
                subjectPromise.push(subjectMark);
            }
        }
        const subjectMarks = await Promise.all(subjectPromise);
        // return subjectMarks;
        const subjectBWData = subjectMarks.map((subject, i) => {
            let scoreString = subject[0] !== undefined ? subject[0].scores : '';
            let numericScoreArray = [];
            if (scoreString) {
                let scoresArray = scoreString.split(",");
                numericScoreArray = scoresArray.map((stringScore, i) => {
                    return parseInt(stringScore);
                });
            }
            let scores = calculateBoxWhiskerData(numericScoreArray);
            let rSubjectId = subject[0] !== undefined ? subject[0]['subject_id'] : 0;
            let rSubject = subject[0] !== undefined ? subject[0]['Subject.subject'] : '';
            let averageCount = average(numericScoreArray);
            return { scores, subject_id: rSubjectId, subject_name: rSubject, marks: numericScoreArray, averageCount };
        });
        return subjectBWData;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const getFilteredScores = () => {
    return [{ a: 1, b: 2 }];
}

module.exports = {
    getMasterData: getMasterData,
    getBowChartData: getBowChartData,
    getFilteredScores: getFilteredScores
}
