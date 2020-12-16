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

    const { name, telephone, latitude, longitude, owner, address, openHour, closeHour } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    const schedule = { openHour, closeHour }
    Local
        .create({ name, telephone, location, owner, schedule, address })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/new-room/', (req, res) => {


    const { name, equipment, capacity, local, price, image } = req.body

    const equipmentList = []
    equipment.map((elm, index) => {
        if (Object.values(elm)[0] !== '') {
            equipmentList.push(Object.values(elm)[0])
        }
    })

    Room

        .create({ name, equipment: equipmentList, capacity, local, price, image })

        .then(response => {

            res.json(response)
            Local
                .findByIdAndUpdate(local, { $push: { room: response._id } })
        })
        .catch(err => res.status(500).json(err))
})

router.post('/edit-room', (req, res) => {

    const { id, equipment, name, price } = req.body
    const equipmentList = []
    equipment.map((elm, index) => {
        if (Object.values(elm)[0] !== '') {
            equipmentList.push(Object.values(elm)[0])
        }
    })


    console.log(equipmentList)
    Room
        .findByIdAndUpdate(id, { name, price, equipment: equipmentList }, {new:true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/getRooms', (req, res) => {
    const rooms = req.body.salaId


    Room
        .find({ _id: { $in: rooms } })
        .populate('reservation')
        .populate('local')
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))

})




router.post('/edit-local', (req, res) => {
    console.log(req.body)
    const { id, name, latitude, longitude, closeHour, openHour, address, telephone } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const schedule = { openHour, closeHour }
    Local
        .findByIdAndUpdate(id, { name, location, schedule, address, telephone })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router