import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import graphsController from "../controllers/graphsController";

const graphsRouter = Router();
graphsRouter.use(verifyToken);

graphsRouter.get("/", (req, res): void => {
  void graphsController.get(req, res);
});

export default graphsRouter;
