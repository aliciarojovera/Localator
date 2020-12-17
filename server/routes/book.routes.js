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
router.post('/findUserBooks', (req, res) => {
    console.log('=======findUserBooks')

    Reservation
        .find({ _id: { $in: req.body } })
        .populate({ path: 'room', populate: { path: 'local' } })
        .then(response => {
            res.json(response)
        })
})


router.post('/newBook', (req, res) => {
    const { room, owner, date, name } = req.body
   

    Reservation
        .create({ room, owner, date, invited: name })
        .then(res => {
            const userPromise = User.findByIdAndUpdate(res.owner, { $push: { reservation: res._id } }, { new: true })
            const roomPromise = Room.findByIdAndUpdate(res.room, { $push: { reservation: res._id } }, { new: true })
            return Promise.all([userPromise, roomPromise])


        })
        .then(response => res.json(response[0]))
        .catch(err => res.status(500).json(err))

})

router.post('/deleteBook', (req, response) => {
    const userId = req.body[0]
    const date = req.body[1]
    const roomId = req.body[2]

    Reservation
        .find({ date: date, room: roomId })
        .then(ros => {
            Reservation.deleteMany({ date: date, room: roomId })
                .then(res => {
                    Room.findByIdAndUpdate(roomId, { $pull: { reservation: ros[0]._id } }, { new: true })
                        .then(ris => {
                            User.findByIdAndUpdate(userId, { $pull: { reservation: ros[0]._id } }, { new: true })
                                .then(rus => {
                                    response.json(ris)
                                })
                        })
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })
})



module.exports = router