import { Alarm, Day } from "../../prisma/generated";

const alarmSeed: Alarm[] = [
  {
    id: 1,
    day: Day.MONDAY,
    start: 7 * 60,
    end: 20 * 60,
  },
  {
    id: 2,
    day: Day.TUESDAY,
    start: 7 * 60,
    end: 20 * 60,
  },
  {
    id: 3,
    day: Day.WEDNESDAY,
    start: 7 * 60,
    end: 20 * 60,
  },
  {
    id: 4,
    day: Day.THURSDAY,
    start: 7 * 60,
    end: 20 * 60,
  },
  {
    id: 5,
    day: Day.FRIDAY,
    start: 7 * 60,
    end: 20 * 60,
  },
  {
    id: 6,
    day: Day.SATURDAY,
    start: 7 * 60,
    end: 20 * 60,
  },
  {
    id: 7,
    day: Day.SUNDAY,
    start: 7 * 60,
    end: 20 * 60,
  },
];

export default alarmSeed;
