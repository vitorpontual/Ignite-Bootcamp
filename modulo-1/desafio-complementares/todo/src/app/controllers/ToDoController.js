const { v4: uuidv4 } = require('uuid')

module.exports = {
   index(request, response){
      try{
	 const { user } = request

	 return response.json(user.todos)
      }catch(err){
	 console.error(err)
      }
   },
   post(request, response){
      try{
	 const { title, deadline } = request.body;

	 const { user } = request;

	 const todoList = {
	    id: uuidv4(),
	    title,
	    done: false,
	    deadline: new Date(deadline),
	    created_at: new Date(),
	 };

	 user.todos.push(todoList);

	 return response.status(201).json(user.todos[user.todos.length - 1])


	 
      }catch(err){
	 console.error(err)
      }
   },
   show(request, response){
      try{
	 const { user } = request
	 const { title, deadline } = request.body
	 const { id } = request.params

	 const todo = user.todos.filter( todo => todo.id === id )

	 return response.json(todo)


      }catch(err){
	 console.error(err)
      }
   },
   update(request, response){
      try{
	 const { title, deadline } = request.body
	 const { user } = request
	 const { id } = request.params

	 const todo = user.todos.find(todo => todo.id === id)

	 if(!todo){
	    return response.status(404).json({ error: 'Todo not found' })
	 }

	 todo.title = title
	 todo.deadline = deadline

	 return response.status(201).json(todo)

      }catch(err){
	 console.error(err)
      }
   },
   partial(request, response){
      try{
	 const { user } = request
	 const { id } = request.params

	 const todo = user.todos.find(todo => todo.id == id)

	 if(!todo){
	    return response.status(404).json({ error: "Todo not found" })
	 }

	 todo.done = true

	 return response.status(201).json(todo)

      }catch(err){
	 console.error(err)
      }
   },
   delete(request, response){
      try{
	 const { user } = request
	 const { id } = request.params

	 const todo = user.todos.find( todo => todo.id === id )

	 if(!todo){
	    return response.status(404).json({ error: 'Todo not found' })
	 }

	 user.todos.splice(todo, 1)

	 return response.status(204).json(user)

      }catch(err){
	 console.error(err)
      }
   }
}
