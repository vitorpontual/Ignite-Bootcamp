const { v4: uuidv4 } = require('uuid')

const users = []

module.exports = {
   post(request, response){
      try{
	 const { name, username } = request.body

	 users.push({
	    name,
	    username,
	    id: uuidv4(),
	    todos: []
	 })

	 return response.status(201).json(users[users.length - 1])

      }catch(err){
	 console.error(err)
      }

   }
}
