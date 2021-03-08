const express = require('express');

const app = express();
const port = 2828 

app.get('/courses', (request, response) => {
   return response.json([
      "Curso 1", "Curso 2", "Curso 3"
   ]);
});

app.post('/courses', (request, response) => {
   return response.json([
      "Curso 1", "Curso 2", "Curso 3", "Curso 4"
   ]);
});

app.put("/courses/:id", (request, response) => {
   return response.json([
      "Curso 5", "Curso 2", "Curso 3", "Curso 4"
   ]);
});

app.patch("/courses/:id", (request, response) => {
   return response.json([
      "Curso 5", "Curso 6", "Curso 3", "Curso 4"
   ]);
});

app.delete("/courses/:id", (request, response) => {
   return response.json([
      "Curso 5", "Curso 2", "Curso 4"
   ])
})

app.listen(port, () => console.log(`Server is running http://localhost:${port}`));
