const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student = new Schema({
    name:{type:String, required:true},
    id:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    age:{type:Number, required:true},
    classroom:{type: Schema.Types.ObjectId, ref: 'classrooms'},
    trip:{type: Schema.Types.ObjectId, ref: 'trips'},
    parentPhoneNumber:String,
    parentEmail:String,
    posts:[{
        lat:Number,
        lng:Number,
        post:String
    }],
    access:{type :Number ,default: 1}
})

const Student = mongoose.model('Students', student) 

module.exports = Student
