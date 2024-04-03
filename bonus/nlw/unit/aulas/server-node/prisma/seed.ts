import { prisma } from '../src/lib/prisma'


async function seed() {
  const eventId = '8e0cace6-10f9-49f8-b883-48ed9f14d500'

  await prisma.event.deleteMany()

  await prisma.event.create({
    data: {
      id: eventId,
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'One Event for Devs falling love for code!',
      maximumAttendees: 120,
    }
  })

}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})