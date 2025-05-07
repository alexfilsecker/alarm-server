import { Request, Response } from "express";
import ControllerAction from "./controllerAction";
import { getPoints } from "../influx/getPoints";

interface GetReturn {
  responseData: {
    points: number[][];
  };
}

const getAction = async (_: Request): Promise<GetReturn> => {
  const points = await getPoints();
  return { responseData: { points } };
};

const graphsController = {
  get: async (req: Request, res: Response) => {
    void ControllerAction(req, res, getAction);
  },
};

export default graphsController;
