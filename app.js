var express = require('express');
var app = express();

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use('/', require('./server/routing.js'));

var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})