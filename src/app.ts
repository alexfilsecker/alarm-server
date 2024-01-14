import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import alarmsRouter from './routes/alarmsRouter';
import authRouter from './routes/authRouter';

declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    user?: {
      id: number;
      username: string;
    };
  }
}

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.method, req.path);
  next();
});

app.use('/auth', authRouter);
app.use('/alarms', alarmsRouter);

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Server started!');
});
