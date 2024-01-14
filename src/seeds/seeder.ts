import { PrismaClient } from '@prisma/client';

import createUsersSeed from './users';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  const users = await createUsersSeed();
  await prisma.user.createMany({ data: users, skipDuplicates: true });
  await prisma.$disconnect();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(() => {
    prisma.$disconnect().catch((e) => {
      console.error(e);
    });
  });
