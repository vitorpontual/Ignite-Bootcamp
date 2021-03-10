const { v4: uuidv4 } = require('uuid')


module.exports = {
   index(request, response){
      try{
	 const { users } = request

	 return response.json(users)
      }catch(err){
	 console.error(err)
      }
   },
   post(request, response){
      try{
	 const { name, username } = request.body

	 const { users } = request

	 const userAlreadyExists = users.some(user => user.username == username)

	 if(userAlreadyExists) return response.status(400).json({ error: "User already exists" })

	 users.push({
	    name,
	    username,
	    id: uuidv4(),
	    todos: []
	 })

	 request.users = users


	 return response.status(201).json(users[users.length - 1])

      }catch(err){
	 console.error(err)
      }

   }
}
