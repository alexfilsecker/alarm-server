import { type Prisma } from '@prisma/client';

const alarmsSeed: Prisma.AlarmCreateManyInput[] = [
  {
    id: 1,
    weekDayId: 1,
    startTime: '09:00',
    endTime: '20:00',
  },
  {
    id: 2,
    weekDayId: 2,
    startTime: '09:00',
    endTime: '20:00',
  },
  {
    id: 3,
    weekDayId: 3,
    startTime: '09:00',
    endTime: '20:00',
  },
  {
    id: 4,
    weekDayId: 4,
    startTime: '09:00',
    endTime: '20:00',
  },
  {
    id: 5,
    weekDayId: 5,
    startTime: '09:00',
    endTime: '20:00',
  },
  {
    id: 6,
    weekDayId: 6,
    startTime: '09:00',
    endTime: '20:00',
  },
  {
    id: 7,
    weekDayId: 7,
    startTime: '09:00',
    endTime: '20:00',
  },
];

export default alarmsSeed;
