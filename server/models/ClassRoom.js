const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classroom = new Schema({
    name:{type:String, required:true},
    students: [{type: Schema.Types.ObjectId, ref: 'Students'}]
})

const Classroom = mongoose.model('Classrooms', classroom) 

module.exports = Classroom
