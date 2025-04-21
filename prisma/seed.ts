import { insertNewGmtOffset } from "../src/prisma/gmtOffset";
import alarmSeed from "../src/seeds/alarm";
import { getGmtOffset } from "../src/service/timeApi";
import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

const seed = async () => {
  if ((await prisma.gmtOffset.count()) === 0) {
    const gmtData = await getGmtOffset();
    await insertNewGmtOffset(gmtData);
  }

  await prisma.alarm.createMany({
    data: alarmSeed,
    skipDuplicates: true,
  });
};

(async () => {
  try {
    await seed();
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
