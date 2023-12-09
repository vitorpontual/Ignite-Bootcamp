import http from 'node:http'
import  { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  const transformed = Number(chuck.toString()) * -1

  callback(null, Buffer.from(String(transformed)))
  console.log(transformed)
}

// req = ReadableStream
// res = WritableStream
const server =http.createServer((req, res) => {
  return req
    .pipe

})

server.listen(3334)
