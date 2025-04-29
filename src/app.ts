import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import authRouter from "./routes/authRouter";
import wss from "./webSocket/ws";
import alarmRouter from "./routes/alarmRouter";

const app = express();

wss.setup(app);

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use((req, _, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/auth", authRouter);
app.use("/alarms", alarmRouter);

app.get("/", (_, res) => {
  res.send("SEMEN");
});

if (wss.server !== undefined) {
  wss.server.listen(8000, () => {
    console.log("Server started!");
  });
}
