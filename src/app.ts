import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  const { body } = req;
  console.log(body);
  return res.send('OK');
});

app.listen(8000, () => {
  console.log('Server started!');
});
