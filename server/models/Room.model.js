

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const roomSchema = new Schema({

    name: String,
    capacity: Number,
    equipment: [String],
    schelude: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation'
    }]

})
const room = mongoose.model('Room', roomSchema)
module.exports = room 