import * as express from "express";
import * as jwt from "jsonwebtoken";
import envs from "../config";
import { UserRequest } from "../interfaces/userRequest";
import * as BlogService from "../service/blogService";

const permissionMiddleware = async (
  req: UserRequest,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  const blogId = req.body.blogId;
  if (!blogId) return res.sendStatus(401).end();
  try {
    const result = await BlogService.hasPermissionToBlog(
      blogId,
      req.user.id
    );
    if (!result) {
      return res
        .sendStatus(401)
        .json({
          message:
            "oh hell no you will touch this holy shit with your fucking hands",
        })
        .end();
    }
    return next();
  } catch {
    return res.sendStatus(401);
  }
};

export default permissionMiddleware;
