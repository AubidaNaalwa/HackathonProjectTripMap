const express = require('express')
const router = express.Router()
const ClassRoom = require('../models/ClassRoom.js')
const Student = require('../models/Student.js')
const Teacher = require('../models/Teacher.js')
const Trip = require('../models/Trip.js')
const mongoose = require('mongoose')
//link for atlas 
mongoose.connect("mongodb://localhost/weatherAPP", {useNewUrlParser: true, useUnifiedTopology: true})




module.exports = router