const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trip = new Schema({
    name:{type:String, required:true},
    coordinates:[{
        lat:Number,
        lng:Number
    }],
    teacher:{type: Schema.Types.ObjectId, ref: 'teachers'},
    classes:[{
        type: Schema.Types.ObjectId, ref: 'teachers'
    }],
    status:Number
})

const Trip = mongoose.model('Trips', trip) 

module.exports = Trip
