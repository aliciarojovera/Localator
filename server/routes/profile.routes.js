const express = require('express')
const router = express.Router()
const User = require('../models/User.model')

router.post('/updateMembers', (req, res) => {
    console.log('===========> POST MEMBERS <==========')
    const myBody = req.body
    const members = myBody[0]
    const user = myBody[1]
    console.log('this is the user: ', user._id)
    console.log('this are the members: ', members)
    User
        .findByIdAndUpdate(user._id, { members }, { new: true })
        .then(resp => res.json(resp))
        .catch(err => res.status(500).json(err))
})


module.exports = router