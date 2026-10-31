import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Tunisia Real Estate Elite',
      description: 'Premium real estate agency focusing on high-value properties in Tunisia.',
      plan: 'PLAN_PRO',
    },
  })

  // 2. Create Users
  const hashedPassword = await bcrypt.hash('password123', 10)

  const owner = await prisma.user.create({
    data: {
      email: 'owner@leadflow.tn',
      name: 'Ahmed Owner',
      password: hashedPassword,
      role: 'BUSINESS_OWNER',
      organizationId: org.id,
    },
  })

  const agent1 = await prisma.user.create({
    data: {
      email: 'agent1@leadflow.tn',
      name: 'Sami Agent',
      password: hashedPassword,
      role: 'AGENT',
      organizationId: org.id,
    },
  })

  const agent2 = await prisma.user.create({
    data: {
      email: 'agent2@leadflow.tn',
      name: ' Leila Agent',
      password: hashedPassword,
      role: 'AGENT',
      organizationId: org.id,
    },
  })

  // 3. Create Properties
  const cities = ['Tunis', 'Lac 1', 'Lac 2', 'La Marsa', 'Carthage', 'Ariana', 'Sousse', 'Monastir', 'Hammamet', 'Nabeul', 'Djerba']
  const propTypes = ['VILLA', 'APARTMENT', 'HOUSE', 'LAND', 'OFFICE']

  for (let i = 0; i < 20; i++) {
    await prisma.property.create({
      data: {
        organizationId: org.id,
        title: `Premium ${propTypes[i % propTypes.length]} ${i + 1}`,
        description: `A beautiful high-value ${propTypes[i % propTypes.length].toLowerCase()} located in ${cities[i % cities.length]}. Perfect for luxury living.`,
        propertyType: propTypes[i % propTypes.length],
        transactionType: i % 2 === 0 ? 'SALE' : 'RENT',
        price: Math.floor(Math.random() * 1000000) + 100000,
        location: cities[i % cities.length],
        city: cities[i % cities.length],
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        surface: Math.floor(Math.random() * 300) + 50,
        status: 'AVAILABLE',
        images: JSON.stringify([`https://picsum.photos/seed/${i}/800/600`]),
        features: JSON.stringify(['Air Conditioning', 'Parking', 'Security']),
      },
    })
  }

  // 4. Create Leads
  for (let i = 0; i < 30; i++) {
    await prisma.lead.create({
      data: {
        organizationId: org.id,
        name: `Lead ${i + 1}`,
        phone: `+216 ${Math.floor(Math.random() * 90000000) + 10000000}`,
        email: `lead${i + 1}@example.com`,
        source: ['FACEBOOK', 'INSTAGRAM', 'WHATSAPP', 'WEBSITE', 'PHONE'][i % 5],
        originalMessage: `I am looking for a ${propTypes[i % propTypes.length].toLowerCase()} in ${cities[i % cities.length]} with budget ${Math.floor(Math.random() * 500000) + 100000} TND`,
        leadScore: Math.floor(Math.random() * 100),
        leadStatus: ['NEW', 'CONTACTED', 'QUALIFIED', 'WON'][i % 4],
        location: cities[i % cities.length],
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
