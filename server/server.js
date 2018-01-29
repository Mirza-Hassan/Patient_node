const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://patient:patient@ds253587.mlab.com:53587/patientapp', {useMongoClient:true});

mongoose.connection.on("connected", function(){
    console.log("mongoose is connected")
})

const auth =  require('./routes/auth');
const patient = require('./routes/patient');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// app.use(express.static(path.join(__dirname, 'dist')))

app.use('/auth', auth)
app.use('/hospital', patient)

// app.get('*', (req, res) => {
//     res.sendfile(path.join(__dirname, 'dist/index.html'));
// });

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`))