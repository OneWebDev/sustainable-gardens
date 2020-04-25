var express = require('express');
var router = express.Router();
// var request = require('request');

router.post('/new-plant-action', (req, res) => {
    // TODO Pass this to other backend
    res.send(req.body)
    // res.sendStatus(200)
})

router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router;