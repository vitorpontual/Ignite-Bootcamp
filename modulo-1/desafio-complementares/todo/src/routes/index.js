const express = require('express')
const router = express.Router()

const User = require('./User')

router.use('/users', User)

module.exports = router

