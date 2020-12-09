const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacher = new Schema({
    name:{type:String, required:true},
    id:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    age:{type:Number, required:true},
    TripName:{type: Schema.Types.ObjectId, ref: 'Trip'},
    access:{default: 0}
    
})

const Teacher = mongoose.model('teachers', teacher) 

module.exports = Teacher
