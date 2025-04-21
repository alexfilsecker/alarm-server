import { getGmtOffset, GmtData } from "../service/timeApi";
import prisma from "./prisma";

export const insertNewGmtOffset = async ({ offset, fetchedAt }: GmtData) => {
  return prisma.gmtOffset.create({
    data: {
      value: offset,
      fetchedAt,
    },
  });
};

export const getGmtOffsetFromDb = async (): Promise<number> => {
  const gmtOffsetRow = await prisma.gmtOffset.findFirst({
    orderBy: {
      fetchedAt: "desc",
    },
    take: 1,
  });

  if (gmtOffsetRow === null) {
    const gmtData = await getGmtOffset();
    const { value } = await insertNewGmtOffset(gmtData);
    return value;
  }

  return gmtOffsetRow.value;
};
