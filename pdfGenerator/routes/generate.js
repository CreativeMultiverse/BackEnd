const express = require('express');
const router = express.Router();
const generateQuestions = require('../helpers/generateTest');
const generateAS = require('../helpers/generateAnswer');
const pdf = require('html-pdf');
const crypto = require('crypto');
const path = require('path');
const pdfMerge = require('easy-pdf-merge');

router.get('/pdf', function (req, res) {
    const body = requestData;
    const Questions = generateQuestions(body);
    const AnswerSheet = generateAS(body);
    const randomID = parseInt(Math.random() * (10000 - 1) + 1);
    const testDirPath = path.join(__dirname, '../', 'tests');

    Promise.all([
        new Promise((resolve, reject) => pdf.create(Questions)
            .toFile(`./tests/test-${randomID}.pdf`, function (err, success) {
                if (err) reject(err);
                resolve(path.join(__dirname, '../', 'tests', `test-${randomID}`) + '.pdf');
            })),
        new Promise((resolve, reject) => pdf.create(AnswerSheet)
            .toFile(`./tests/answer-${randomID}.pdf`, function (err, success) {
                if (err) reject(err);
                resolve(path.join(__dirname, '../', 'tests', `answer-${randomID}`) + '.pdf');
            }))
    ]).then(response => {
        pdfMerge(response, testDirPath + `/test-merge-${randomID}.pdf`, function (err) {
            if (err) res.status(400).send(err);
            res.status(200).sendFile(testDirPath + `/test-merge-${randomID}.pdf`);
        });
    })
        .catch(error => res.status(400).send(error));
});

module.exports = router;


const requestData = {
    questions: [
        {
            question: 'Колко птички има на дървото?',
            answers: [
                'Две',
                'Три',
                'Четири',
                'Няма това не е дърви'
            ],
            answerKey: 0
        },
        {
            question: 'Къде искаш да пием после',
            answers: [
                'Дома',
                'Навънка',
                'Няма да пием',
                'Да'
            ],
            answerKey: 3
        },
        {
            question: 'Ще бием ли',
            answers: [
                'Да',
                'Да',
                'Ofcourse',
                'Обичам ли пица?'
            ],
            answerKey: 3
        },
        {
            question: 'Колко е 5 * 7',
            answers: [
                '-5',
                '30',
                '35',
                '40'
            ],
            answerKey: 2
        },
        {
            question: 'Коя е най-добрата рок група',
            answers: [
                'AC/DC',
                'Three Days Grace',
                'AC/DC',
                'AC/DC е'
            ],
            answerKey: 0
        },
        {
            question: 'Боли ли ме главата вече',
            answers: [
                'Да',
                'Не',
                'Лошо ми е',
                'Виждам двойно'
            ],
            answerKey: 3
        }
    ],
    subject: 'Общи приказки'
}