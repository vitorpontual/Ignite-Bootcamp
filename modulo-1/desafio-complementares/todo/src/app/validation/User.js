function checkExistsUserAccount(request, response, next){
   try{
      const { username } = request.headers
      const { users } = request
      console.log(users)

      const user = users.find( user => user.username === username )

      console.log(user)
      if(!user){
	 return response.status(400).json({ error: "User not found" })
      }

      request.user = user

      next()
   }catch(err){
      console.error(err)
   }
}

module.exports = {
   checkExistsUserAccount
}
