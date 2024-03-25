import { PrismaClient } from '@prisma/client';
import { randomCharacters } from 'src/share/tools/generate-random-characters';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';

async function main() {
  const password = process.env.PASSWORD;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.superuser.create({
    data: {
      confirmCode: randomCharacters(),
      email: process.env.EMAIL,
      password: hashedPassword,
      name: process.env.NAME,
    },
  });

  return 'success';
}

main();
