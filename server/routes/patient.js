var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//models
var Patient = mongoose.model('Patient', {
    patientName: String,
    patientAge: String,
    patientAddress: String,
    contactNo: String,
    email: String,
    medicine: String,
    diseases: String,
    gender:String,
    description: String,
    date: String,
    time: String,
    id: String
})

router.post('/patient', function(req, res) {
    Patient.create({
        patientName: req.body.patientName,
        patientAge: req.body.patientAge,
        patientAddress: req.body.patientAddress,
        contactNo: req.body.contactNo,
        email: req.body.email,
        medicine: req.body.medicine,
        diseases: req.body.diseases,
        gender: req.body.gender,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        id: req.body.id
    }, function (err, patient){
        if(err){
            res.send(err)
        }
        res.json(patient)
    })
})

router.get('/patient/:id', function(req, res){
    Patient.find({id: req.params.id}, function(err, patient){
        if(err) {
            res.send(err)
        }
        res.json(patient)
    })
})

router.delete('/patient/:id', function(req, res){
    Patient.remove({
       _id: req.params.id 
    }, function (err, patient){
        if(err) {
            console.log('delete err', err)
        }
        res.send({id: req.params.id});
    })
})

module.exports = router