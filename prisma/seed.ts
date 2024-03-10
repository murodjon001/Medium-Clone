import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
// import { SuperUserEntity } from '../src/bounded-contexts/administration/authentication/entity/superuser-entity';

const saltRounds = 10;
const password = process.env.PASSWORD 
const salt = bcrypt.genSaltSync(10); // Generate a salt with 10 rounds
const hashedPassword = bcrypt.hashSync(password, salt)
// const superUserEntity = new SuperUserEntity({
//   email: process.env.EMAIL,
//   confirmCode: "SUPER_USER",
//   password: process.env.PASSWORD,
//   name: process.env.NAME
// })

// superUserEntity.hashPassword()
// console.log(superUserEntity)
async function main() {

  await prisma.superuser.create({
    data: {
      confirmCode: "SUPER_USER",
  email: process.env.EMAIL,
  password: hashedPassword,
  name: process.env.NAME
    },
  })
}

main()