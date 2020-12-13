const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Reservation = require('./../models/Reservation.model')
const Room = require('../models/Room.model')
const User = require('../models/User.model')


router.post('/newBook', (req, res) => {
    const room = req.body.bookRoom
    const owner = req.body.loggedUser._id
    const date = req.body.bookDate
    let bookId = ''
    console.log(req.body)
    console.log(date)
    Reservation
        .create({ room, owner, date })
        .then(res => {
            bookId = res._id
            User
                .findByIdAndUpdate(owner, { $push: { reservation: res._id } }, { new: true } )
                .then(() =>
                    Room
                        .findByIdAndUpdate(room, { $push: { reservation: res._id } },{new:true})
                        .then(response => res.json(response))
                        .catch(err => res.status(500).json(err))

                )
                .catch(err => res.status(500).json(err))

        })
        .catch(err => res.status(500).json(err))

})

router.post('/findBooks', (req, res) => {

    let rooms = req.body
    
    let idRooms = rooms.map(a=>a._id)


        Reservation
            .find({ room:idRooms})
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))
   
})


module.exports = router