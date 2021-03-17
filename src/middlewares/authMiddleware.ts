import * as express from "express";
import * as jwt  from "jsonwebtoken";
import envs from "../config";
import { UserRequest } from "../interfaces/userRequest";
import * as UserService from "../service/userService";

const authMiddleware = async (
  req: UserRequest,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    const tokenData = jwt.verify(token, envs.jwtSecret as string, { ignoreExpiration: false }) as { payload: string };
    console.log(tokenData);
    const user = await UserService.getUserByToken(tokenData.payload);
    req.user = user;
    return next();
  } catch {
    return res.sendStatus(401);
  }
};


export default authMiddleware;
