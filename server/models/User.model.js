const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["USER", "OWNER"],
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    telephone: {
        type: Number,
        require: true
    },
    members: {
        name: {
            type: String
        },
        email: {
            type: String
        }
    }

})

const User = mongoose.model('User', userSchema)
module.exports = User 