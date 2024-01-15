import { type Prisma } from '@prisma/client';

const weekDaysSeed: Prisma.WeekDayCreateManyInput[] = [
  {
    id: 1,
    name: 'Monday',
  },
  {
    id: 2,
    name: 'Tuesday',
  },
  {
    id: 3,
    name: 'Wednesday',
  },
  {
    id: 4,
    name: 'Thursday',
  },
  {
    id: 5,
    name: 'Friday',
  },
  {
    id: 6,
    name: 'Saturday',
  },
  {
    id: 7,
    name: 'Sunday',
  },
];

export default weekDaysSeed;
