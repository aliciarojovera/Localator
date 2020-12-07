const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Local = require('../models/Local.model')


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


router.post('/new-room/:localId', (req, res) => {

    console.log(req.params)
    if (!mongoose.Types.ObjectId.isValid(req.params.local_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Local
        .findById(req.params.local_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
//     const { name, equipment, capacity } = req.body

// console.log(req.params)
//     Local
    
//         .findByIdAndUpdate(req.params.localId, {room: name, equipment, capacity })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
})


router.put('/editLocal/:localId', (req, res) => {

    Local
        .findByIdAndUpdate(req.params.localId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router