import { Router } from 'express';

const PASSWORD = '1234';

const authRouter = Router();
authRouter.post('/login', (req, res) => {
  if (req.body.password === PASSWORD) {
    res.status(200).send('OK');
    return;
  }
  res.status(401).send('Incorrect password');
});

export default authRouter;
