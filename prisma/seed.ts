import { PrismaClient } from '@prisma/client';

import alarmsSeed from './seeds/alarmsSeed';
import usersSeed from './seeds/usersSeed';
import weekDaysSeed from './seeds/weekDaysSeed';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  await prisma.user.createMany({
    data: await usersSeed(),
    skipDuplicates: true,
  });

  await prisma.weekDay.createMany({ data: weekDaysSeed, skipDuplicates: true });

  await prisma.alarm.createMany({ data: alarmsSeed, skipDuplicates: true });

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
