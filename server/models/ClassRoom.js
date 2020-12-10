const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classroom = new Schema({
    name:{type:String, required:true},
    students: [{type: Schema.Types.ObjectId, ref: 'students'}]
})

const Classroom = mongoose.model('Classrooms', classroom) 

module.exports = Classroom
