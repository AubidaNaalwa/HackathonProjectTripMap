const express = require('express')
const router = express.Router()
const ClassRoom = require('../models/ClassRoom')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Trip = require('../models/Trip')
const mongoose = require('mongoose')
//link for atlas 
const uri = "mongodb+srv://AubidaNaalwa:Admin1234@cluster0.cvbqr.mongodb.net/MGapp?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})


router.post('/class/asignClassroom', async function(req,res){
    const name = req.body.name
    const classRoom = new ClassRoom({name})
    classRoom.save()
    res.end()

})

router.post('/Emergency', async function(req,res){
    const EmergencySituation = req.body.text
    const name = req.body.trip
    Trip.find({name}).populate({
        path:"classes",
        populate:{
            path:"students"
        }
    }).exec(function(err, Trip){
        //send email for each email
    })
    res.end()

})

router.post('/Student', function(req,res){
    const student = req.body.student
    student.classroom = await ClassRoom.findOne({classRoom : Student.classRoom})
    const newStudent = new Student(student)
    newStudent.save()
    res.end()
})

router.post('/trip', function(req,res){
    const  trip
    const classes = []
    for(let i of trip.classRoom){
        classes.push(
            await ClassRoom.findOne({name:i})
        )
    }
    trip.classRoom = classes
    const newTrip = trip({trip})
    newTrip.save()
})

router.get('/user/:user', async function(req,res){
    const user = req.params.user
    let checkUser = await Teacher.findOne({
        email:user.username,
        password:user.password
    })
    if(!checkUser){
        checkUser = await Student.findOne({
            email:user.username,
            password:user.password
        })
        if(checkUser){
            res.send({access : 1})
        }else{
            res.send({access : -1})
        }
    }else{
        res.send({access : 0})
    }
})
module.exports = router