import { Router } from 'express';

import alarmsController from '../controllers/alarmsController';
import verifyToken from '../middlewares/verifyToken';

const alarmsRouter = Router();
alarmsRouter.use(verifyToken);

alarmsRouter.get('/', (req, res) => {
  alarmsController.getAlarms(req, res);
});

export default alarmsRouter;
