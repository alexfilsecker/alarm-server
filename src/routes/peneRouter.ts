import { Router } from 'express';

import verifyToken from '../middlewares/verifyToken';

const peneRouter = Router();

peneRouter.use(verifyToken);

peneRouter.post('', (req, res) => {
  console.log(req.body);
  res.status(200).send('pene');
});

export default peneRouter;
