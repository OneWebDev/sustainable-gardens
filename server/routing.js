var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/new-plant-action', (req, res) => {
    // TODO Pass this to other backend
    console.log(req.body)
    var d = {
        'enablelight': {
            plot: '1',
            type: 'lighton',
            auto: 'false'
        },
        'disablelight': {
            plot: '1',
            type: 'lightoff',
            auto: 'false'
        }
    }
    if(req.body.action in d) {
        console.log('POSTING', d[req.body.action])
        var options = { method: 'POST',
        url: 'http://81377d65.ngrok.io/action',
        headers: 
        { 'Postman-Token': 'bb965265-0934-4753-8f76-e1c91c8bbbad',
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded' },
        form: d[req.body.action]
        };

        request(options, function (error, response, body) {
        // if (error) throw new Error(error);
            if(error) {
                res.send(error)
            } else {
                res.send(req.body)
            }
        });

    }

    // res.sendStatus(200)
})

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/wiki', (req, res) => {
    res.render('wiki')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/stream', (req, res) => {
    res.render('stream')
})
// router.get('/live', (req, res) => {
//     res.render('live')
// })
router.get('/live2', (req, res) => {
    res.render('live2')
})
router.get('/get-all-data', (req, res) => {
    var request = require("request");

    var options = { method: 'POST',
    url: 'http://81377d65.ngrok.io/getData',
    headers: 
    { 'Postman-Token': '791ae8bc-0a46-4c1b-a7c5-ca42c57703ad',
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded' },
    form: { plot: '4', type: 'water', undefined: undefined } };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
        // console.log(body);
        res.send(body)
    });

})

module.exports = router;