

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const roomSchema = new Schema({

    name: String,
    capacity: Number,
    equipment: [String],
    image: String, 
    price: Number, 
    reservation: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation'
    }],
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Local'
    }

})
const room = mongoose.model('Room', roomSchema)
module.exports = room 