import { FastifyInstance } from "fastify";
import { BadRequest } from "../routes/_erros/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (err, req, res) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Error during validation',
      error: err.flatten().fieldErrors
    })

    if (err instanceof BadRequest) {
      return res.status(400).send({ message: err.message })
    }
    return res.status(500).send({ message: 'Internal server error' })
  }
}