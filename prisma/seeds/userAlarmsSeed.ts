import { type Prisma } from '@prisma/client';

const userAlarmsSeed: Prisma.UserAlarmCreateManyInput[] = [
  {
    id: 1,
    userId: 1,
    alarmId: 1,
  },
  {
    id: 2,
    userId: 1,
    alarmId: 2,
  },
  {
    id: 3,
    userId: 1,
    alarmId: 3,
  },
  {
    id: 4,
    userId: 1,
    alarmId: 4,
  },
  {
    id: 5,
    userId: 1,
    alarmId: 5,
  },
  {
    id: 6,
    userId: 1,
    alarmId: 6,
  },
  {
    id: 7,
    userId: 1,
    alarmId: 7,
  },
];

export default userAlarmsSeed;
