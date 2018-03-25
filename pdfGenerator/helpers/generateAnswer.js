function generateAnswerSheet(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Лист за отговори</title>
    <style>
        .text-center {
            text-align: center;
        }

        hr {
            width: 80%;
        }

        .heading {
            width: 80%;
            margin: 10px auto;
            font-size: 30px;
        }

        .table-container {
            margin: 0 auto;
            width: 80%;
        }

        table {
            margin: 0 auto;
            border-collapse: collapse;
        }

        .question-number {
            width: 140px;
            padding-left: 5px;
        }

        th,
        td {
            padding: 5px 20px;
            margin: 0 15px;
            font-size: 25px;
            text-align: center;
        }

        .circle {
            border-radius: 50px/50px;
            border: 3px solid #000;
            width: 40px;
            height: 40px;
        }
    </style>
    </head>
    <body>
    <h2 class="text-center">Лист за отговори</h2>
    <hr>
    <h3 class="heading text-center">Отговори на задачите:</h3>
    ${generateTable(data)}
    </body>
    </html>
    `;
}

function generateTable(data){
    const rowsNumber = data.questions.length;
    const bubblesArr = [];
    for(let i = 0; i < rowsNumber; i++) {
        bubblesArr.push(generateRow(i + 1));
    }

    return `
        <table class="table-container">
            <thead>
                <tr>
                    <th>
                        Въпрос
                    </th>
                    <th>
                        а)
                    </th>
                    <th>
                        б)
                    </th>
                    <th>
                        в)
                    </th>
                    <th>
                        г)
                    </th>
                </tr>
            </thead>

            <tbody>
                ${bubblesArr.join('\n')}
            </tbody>
        </table>
    `;
}

function generateRow(number){
    return `
    <tr>
        <td class="question-number">${number}.</td>
        <td>
            <div class="circle">
            </div>
        </td>
        <td>
            <div class="circle">
            </div>
        </td>
        <td>
            <div class="circle">
            </div>
        </td>
        <td>
            <div class="circle">
            </div>
        </td>
    </tr>
    `
}

module.exports = generateAnswerSheet;