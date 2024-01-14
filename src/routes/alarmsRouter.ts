import { Router } from 'express';

const alarmsRouter = Router();

const defaultAlarm = {
  enabled: true,
  startTime: '09:00',
  endTime: '17:00',
};

const alarms = {
  monday: defaultAlarm,
  tuesday: defaultAlarm,
  wednesday: defaultAlarm,
  thursday: defaultAlarm,
  friday: defaultAlarm,
  saturday: defaultAlarm,
  sunday: defaultAlarm,
};

alarmsRouter.get('/', (req, res) => {
  res.status(200).json(alarms);
});

export default alarmsRouter;
