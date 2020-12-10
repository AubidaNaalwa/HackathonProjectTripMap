const express = require('express')
const router = express.Router()
const ClassRoom = require('../models/ClassRoom')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Trip = require('../models/Trip')
const mongoose = require('mongoose')
const mailSender = require('./mailGmail.js')
//link for atlas 
const uri = "mongodb+srv://AubidaNaalwa:Admin1234@cluster0.cvbqr.mongodb.net/MGapp?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

router.post('/class/asignClassroom', async function(req,res){
    const name = req.body
    const classRoom = new ClassRoom({name:name.name})
    classRoom.save()
    res.end()

})


router.post('/tripdelete', async function(req, res){
    const name = req.body.name
    const teacher = req.body.teacher

    Trip.deleteMany({name:name},function(err){
        if(err)
            res.send(err)
        else
            res.end()
    })

    Teacher.findOneAndUpdate({email : teacher},{ TripName : null}, function(err, data){
    })
})

router.post('/addteacher',async function(req,res){
    const teacher = req.body
    new Teacher(teacher).save()
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
    }).exec(function(err, data){
        if(err){
            res.send(err)
        }      
        res.end()
        //send email for each email

    })

})

router.post('/Student', function(req,res){
    new Student(req.body).save()
    res.end()
})

router.post('/trip', async function(req,res){
    const trip =JSON.parse(req.body)
    const classes = []
    for(let i of trip.classes){
        classes.push(
            await ClassRoom.findOne({name:i})
        )
    }
    trip.classes = classes
    trip.teacher = await Teacher.findOne({
        email:trip.teacher
    })
    const newTrip = new Trip(trip)
    newTrip.save()
    res.end()
})

router.post('/user', async function(req,res){
    const user = req.body
    
    let checkUser = await Teacher.findOne({
        email:user.username,
        password:user.password
    }).populate(
        "trip"
    )
    if(!checkUser){
        checkUser = await Student.findOne({
            email:user.username,
            password:user.password
        }).populate({
            path:"trip"
        })
        if(checkUser){
            res.send({checkUser,access : 1})
        }else{
            res.send({access : -1})
        }
    }else{
        res.send({checkUser,access : 0})
    }
})

router.get('/classRooms', function(req,res){
    ClassRoom.find({},function(err, data){ 
        if(err)
            res.send(err)
        res.send(data)
    })
})

router.post('/postText', async function(req,res){
    const email = req.body.email
    const post =req.body.post
    Student.findOneAndUpdate({email} ,{$push : {posts:post}},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    }) 
})

router.post('/sos',  function(req,res){
     Teacher.findOne({email:req.body.userName}).populate({path:"trips",
    populate:{
        path:"classrooms",
        populate:{
            path:"students"
        }
    }
}).exec(function(err,data){
    if(err){
        res.send(err)
        return
    }
    res.end()
    if(!data)
        return
    for(let j of data.TripName.classes){
        for(let i of j.students)
            mailSender(req.body.text , req.body.user, i.email)
    }
})
    
})


module.exports = router