const express = require('express')
const router = express.Router()

const TodoController = require('../app/controllers/ToDoController')
const Validation = require('../app/validation/User')

router.get('/', Validation.checkExistsUserAccount, TodoController.index)
   .get('/:id', Validation.checkExistsUserAccount, TodoController.show)

router.post('/', Validation.checkExistsUserAccount, TodoController.post)
   .put('/:id', Validation.checkExistsUserAccount, TodoController.update)

module.exports = router
