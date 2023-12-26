import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import ControllerAction from "./controllerAction";

const secretKey = "secretKey";

type LoginActionResult = {
  responseData: {
    token: string;
  };
  status: number;
};

const loginAction = async (req: Request): Promise<LoginActionResult> => {
  const { password } = req.body;
  if (password !== "1234") {
    throw new Error("Incorrect password");
  }

  const user = { id: 1, username: "Alex" };
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

  return {
    responseData: {
      token
    },
    status: 200
  };
};

const authController = {
  login: async (req: Request, res: Response) => {
    void ControllerAction(req, res, loginAction);
  }
};

export default authController;
