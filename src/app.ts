import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import authRouter from "./routes/authRouter";
import peneRouter from "./routes/peneRouter";


const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/pene", peneRouter);

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log("Server started!");
});
