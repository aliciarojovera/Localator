const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Room = require('./../models/Room.model')



router.post('/newBook', (req, res) => {
    const room = req.body.bookRoom
    const user = req.body.loggedUser._id
    const date = req.body.bookDate
    const local= req.body.local._id

    Room.create({ room, user, date, local })
    
    




})
module.exports = router