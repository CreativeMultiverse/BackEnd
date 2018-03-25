const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
router.post('/', function (req, res) {
    console.log(req.body);
    
    const body = bodyParams;
    const IMG_URL = body.img_url;
    const AnswerKeys = body.AnswerKeys;
    const ls = spawn('python', ['../helpers/gradee.py', IMG_URL, AnswerKeys ], { cwd: __dirname });

    ls.stdout.on('data', data => {
        ls.kill();
        return res.status(200).send(JSON.parse(data));
    });
});

module.exports = router;

const bodyParams = {
    img_url: '../images/contoured.png',
    AnswerKeys: [0, 1, 2, 1, 0, 3, 2]
}