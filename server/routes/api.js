const express = require('express')
const router = express.Router()
const ClassRoom = require('../models/ClassRoom')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Trip = require('../models/Trip')
const mongoose = require('mongoose')
//link for atlas 
mongoose.connect("mongodb://localhost/TripDB", {useNewUrlParser: true, useUnifiedTopology: true})

router.get('/login', async (req, res) => {
    try{
        res.send('haha');
    } catch(error){
        res.send(error)
    }  
})


module.exports = router