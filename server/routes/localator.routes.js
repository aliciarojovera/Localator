const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/User.model')

router.post('/new-user', (req, res) => {

    console.log('============YYYYYYYY')
    User
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router