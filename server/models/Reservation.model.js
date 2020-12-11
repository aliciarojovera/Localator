const mongoose = require('mongoose')
const Schema = mongoose.Schema


const reservationSchema = new Schema({

    date: {
        type: Date
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    invited: {
        type: String
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }

})
const reservation = mongoose.model('Reservation', reservationSchema)
module.exports = reservation 