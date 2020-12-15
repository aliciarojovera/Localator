const express = require('express')
const router = express.Router()
const Reservation = require('./../models/Reservation.model')
const Room = require('../models/Room.model')
const User = require('../models/User.model')

router.post('/findBooksById', (req, res) => {
    let idRooms = req.body
    Reservation
        .find({ _id: { $in: idRooms } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/findBooks', (req, res) => {

    let rooms = req.body
    

    if (req.body.salaId) {
        Reservation
            .find({ room: { $in: req.body.salaId } })
            .populate('room')
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))
    }
    else {
        
        let idRooms = rooms.map(room => room._id)

    Reservation
        .find({ room: { $in: idRooms } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
}
})


router.post('/newBook', (req, res) => {
    const { room, owner, date, name } = req.body
    console.log(req.body)
    console.log(req.body)

    Reservation
        .create({ room, owner, date, invited: name })
        .then(res => {
            console.log(res)
            const userPromise = User.findByIdAndUpdate(res.owner, { $push: { reservation: res._id } }, { new: true })
            const roomPromise = Room.findByIdAndUpdate(res.room, { $push: { reservation: res._id } }, { new: true })
            return Promise.all([userPromise, roomPromise])


        })
        .then(response => res.json(response[0]))
        .catch(err => res.status(500).json(err))

})





module.exports = router