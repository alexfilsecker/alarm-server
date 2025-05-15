import { Request, Response } from "express";
import ControllerAction from "./controllerAction";
import { getPoints } from "../influx/getPoints";
import { graphsSchema } from "../middlewares/validation/graphs";

interface GetReturn {
  responseData: {
    points: number[][];
  };
}

const getAction = async (req: Request): Promise<GetReturn> => {
  const query = graphsSchema.parse(req.query);
  const points = await getPoints(query.range);
  return { responseData: { points } };
};

const graphsController = {
  get: async (req: Request, res: Response) => {
    void ControllerAction(req, res, getAction);
  },
};

export default graphsController;
