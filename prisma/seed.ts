import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = process.env.PASSWORD 
const hash = bcrypt.hashSync(password, saltRounds)

async function main() {

  await prisma.user.create({
    
    data: {
      email: process.env.EMAIL,
      name: process.env.NAME,
      password: hash
    },
  })
  
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