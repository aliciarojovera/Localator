const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Local = require('../models/Local.model')


router.get('/getLocals', (req, res) => {

    Local
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/gelLocal/:localId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.local_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Local
        .findById(req.params.localId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/new-local', (req, res) => {
console.log()
  
    const { name, telephone, latitude, longitude} = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    console.log(location)
  Local
        .create({ name, telephone, location })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editLocal/:localId', (req, res) => {

    Local
        .findByIdAndUpdate(req.params.localId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router