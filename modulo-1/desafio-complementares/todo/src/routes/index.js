const express = require('express')
const router = express.Router()

const User = require('./User')
const Todo = require('./Todo')

router.use('/users', User)
router.use('/todos', Todo)

module.exports = router

