import http from 'node:http'

// CommonJS => require
// ESModulejs ==> export
// Criar usuários
// Listagem de usuários
// Edição de usuários
// Remoção de usuários

// HTTP
// - Método http
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar recurso back-end
// POST => Criar uma recurso
// PUT => Editar/ Atualizar um recurso no back-end
// PATCH => Atualizar uma informação única ou especifica de um recurso no back-end
// DELETE => Deletar um recurso do backend

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless (revisar)
// JSON - JavaScript Object Notation

// HEADERS (Requisição/resposta) ==> Metadados

// HTTP Status Code - MDN
const users = []

const server = http.createServer(async(request, response) => {
  const { method, url } = request

  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  }catch{
    request.body = null
  }

  console.log(request.body)

  if (method === 'GET' && url === '/users'){
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users)) }

  if (method === 'POST' && url === '/users'){

    const { name, email} = request.body

    users.push({
      id: 1,
      name,
      email
    })
    return response.writeHead(201).end()
  }


  return response.writeHead(404).end()
})

server.listen(3333)
