import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      password: hashedPassword,
    },
    create: {
      username: 'admin',
      password: hashedPassword,
      role: Role.ADMIN,
      staff: {
        create: {
          names: 'Admin',
          lastName: 'System',
          dni: '00000000',
          email: 'admin@turing.edu.pe'
        }
      }
    },
  })
  console.log({ admin })

  // Seed Payment Plans
  const plans = [
    { name: 'Mensualidad', cost: 350.00, frequency: 'MONTHLY', installments: 1 },
    { name: 'Matrícula Anual', cost: 150.00, frequency: 'ONE_TIME', installments: 1 },
    { name: 'Trimestral', cost: 1000.00, frequency: 'QUARTERLY', installments: 1 },
  ]

  for (const plan of plans) {
    await prisma.paymentPlan.create({
      data: plan
    })
  }
  console.log('Payment Plans seeded')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
