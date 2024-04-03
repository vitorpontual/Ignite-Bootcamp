import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ZodObject, z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/events/:eventId", {
      schema: {
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200: {
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().nullable(),
              attendeesAmount: z.number().int(),

            })
          }
        }
      }
    }, async (req, res) => {
      const { eventId } = req.params

      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          details: true,
          slug: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true
            }
          }
        },
        where: {
          id: eventId
        }
      })


      if (event === null) {
        throw new Error('Event not found')
      }

      return res.send({
        event: {
          id: event.id,
          details: event.details,
          title: event.title,
          slug: event.slug,
          maximunAttendees: event.maximumAttendees,
          attendeesAmount: event._count.attendees
        }
      })
    })
}