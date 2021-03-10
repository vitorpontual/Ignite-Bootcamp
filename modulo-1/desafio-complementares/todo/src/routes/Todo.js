const express = require('express')
const router = express.Router()

const TodoController = require('../app/controllers/ToDoController')
const Validation = require('../app/validation/User')

router.get('/', Validation.checkExistsUserAccount, TodoController.index)
router.post('/', Validation.checkExistsUserAccount, TodoController.post)

module.exports = router
