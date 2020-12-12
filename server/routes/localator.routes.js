const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Local = require('../models/Local.model')
const Room = require('../models/Room.model')


router.get('/getAllLocals', (req, res) => {

    Local
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneLocal/:local_id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.local_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Local
        .findById(req.params.local_id)
        .populate('room')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/new-local', (req, res) => {

    const { name, telephone, latitude, longitude, owner, openHour, closeHour } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const schedule = { openHour, closeHour }
    Local
        .create({ name, telephone, location, owner, schedule })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/new-room/', (req, res) => {


    const { name, equipment, capacity, local } = req.body

    Room

        .create({ name, equipment, capacity, local })

        .then(response => {

            res.json(response)
            Local
                .findByIdAndUpdate(local, { $push: { room: response._id } })
                .then(res => console.log(res))
        })
        .catch(err => res.status(500).json(err))
})


router.post('/getRooms', (req, res) => {
    const rooms = req.body


    Room
        .find({ _id: { $in: rooms } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})




router.post('/edit-local', (req, res) => {
    console.log(req.body)
    const { id, name, latitude, longitude, closeHour, openHour, telephone }=req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const schedule = { openHour, closeHour }
    Local
        .findByIdAndUpdate(id, {name, location, schedule, telephone})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router