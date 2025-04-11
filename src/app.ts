import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import authRouter from "./routes/authRouter";
import peneRouter from "./routes/peneRouter";

declare module "express" {
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

app.use((req, _, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/auth", authRouter);
app.use("/pene", peneRouter);

app.get("/", (_, res) => {
  res.send("SEMEN");
});

app.listen(8000, () => {
  console.log("Server started!");
});
