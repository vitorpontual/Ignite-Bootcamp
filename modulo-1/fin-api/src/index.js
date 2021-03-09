const express = require('express')
const { v4: uuidv4 } = require('uuid')


const app = express();
const port = 2828

app.use(express.json())

/*
 * cpf - string
 * name - string
 * id - uuid
 * statemnet []
 *
 */

const customers = [];

app.post('/account', (request, response) => {
   const { cpf, name } = request.body;
   const id = uuidv4()

   customers.push({
      cpf,
      name,
      id,
      statement: []
   })

   return response.status(201).send()


});

app.listen(port, () => console.log(`Server is running http://localhost:${port}`));


