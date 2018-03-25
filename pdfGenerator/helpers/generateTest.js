function generateHTML(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Тест</title>
        <style>
            body {
                font-size: 17px;
            }
    
            .center-text {
                text-align: center;
            }
    
            h2 {
                margin: 5px 0;
            }
    
            hr {
                margin: 0 auto;
                width: 90%;
            }
    
            .schooler-meta-data {
                width: 80%;
                margin: 10px auto;
                display: block;
            }
    
            .schooler-meta-data > p {
                display: inline-block;
                margin: 10px 20px;
            }
    
            .schooler-meta-data .name {
                width: 200px;
            }
    
            .schooler-meta-data .class {
                width: 35px;
            }
    
            .schooler-meta-data .id {
                float: 30px;
            }
    
            .questions-container {
                width: 80%;
                margin: 0 auto;
                display: block;
            }
    
            .question {
                width: 48%;
                float: left;
                margin-left: 10px;
            }
    
            .question::after {
                content: "";
                display: inline-block;
                clear: both;
            }
    
            .question-title {
                font-weight: 700;
                margin-bottom: 4px;
            }
    
            .answer {
                margin: 2px 0 3px 5px;
    
            }
        </style>
    </head>
    <body>
    <h2 class="center-text">Тест</h2>
    <h2 class="center-text">${data.subject}</h2>
    <hr>
    <div class="schooler-meta-data">
        <p class="name">Име: </p>
        <p class="class">Клас: </p>
        <p class="id">Номер: </p>
    </div>
    <div class="questions-container">
        ${generateQuestions(data)}
    </div>
    </body>
    </html>
    `;
}

function generateQuestions(data){
    const qstsArr = data.questions.map((q, i) => generateSingleQuestion(q, i + 1));
    
    return qstsArr.join('\n');
}

function generateSingleQuestion(question, number){
    return `
    <div class="question">
        <p class="question-title">${number}. ${question.question}:</p>
        <p class="answer">a) ${question.answers[0]}</p>
        <p class="answer">б) ${question.answers[1]}</p>
        <p class="answer">в) ${question.answers[2]}</p>
        <p class="answer">г) ${question.answers[3]}</p>
    </div>`;
}

module.exports = generateHTML;