const mongoose = require('mongoose')
const Schema = mongoose.Schema


const localSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    telephone: {
        type: Number,
        require: true,
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    room: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Room'
        }
    ],
    schedule: {
        openHour: [String],
        closeHour: [String],
        
    }

})
const Local = mongoose.model('Local', localSchema)
module.exports = Local 