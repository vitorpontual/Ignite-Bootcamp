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

	 return response.status(201).send()


	 
      }catch(err){
	 console.error(err)
      }
   }
}
