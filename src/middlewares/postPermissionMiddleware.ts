import * as express from "express";
import * as jwt from "jsonwebtoken";
import envs from "../config";
import { UserRequest } from "../interfaces/userRequest";
import * as PostService from "../service/postService";

const permissionMiddleware = async (
  req: UserRequest,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  const userId = req.user.id;
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(400).end();
  }
  try {
    const result = await PostService.hasPermission(id, userId);
    if (!result) {
      return res
        .sendStatus(401)
        .json({
          message:
            "oh hell no you will touch this holy shit with your fucking quick hands",
        })
        .end();
    }
    return next();
  } catch {
    return res.sendStatus(401);
  }
};

export default permissionMiddleware;
