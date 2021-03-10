const express = require('express')
const router = express.Router()

const UserController = require('../app/controllers/UserController')

router.get('/', UserController.index)
router.post('/', UserController.post)

module.exports = router
