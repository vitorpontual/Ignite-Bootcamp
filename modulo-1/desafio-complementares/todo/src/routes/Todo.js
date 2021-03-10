const express = require('express')
const router = express.Router()

const TodoController = require('../app/controllers/ToDoController')
const Validation = require('../app/validation/User')

router.use(Validation.checkExistsUserAccount)

router.get('/', TodoController.index)
   .get('/:id', TodoController.show)

router.post('/', TodoController.post)
   .put('/:id', TodoController.update)
   .patch('/:id/done', TodoController.partial)
   .delete('/:id', TodoController.delete)

module.exports = router
