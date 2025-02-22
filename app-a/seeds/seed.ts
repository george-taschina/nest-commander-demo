import { PrismaClient } from '@shared/prisma-client/src/generated';
import { hash } from 'bcrypt-ts';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const users = [
    { username: 'alice', password: await hash('password123', saltRounds) },
    { username: 'bob', password: await hash('securepass', saltRounds) },
    { username: 'charlie', password: await hash('charliepass', saltRounds) },
  ];

  await prisma.user.createMany({ data: users });

  await prisma.document.createMany({
    data: [
      { content: 'Document 1 content', owner: 'alice' },
      { content: 'Document 2 content', owner: 'bob' },
      { content: 'Document 3 content', owner: 'charlie' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
