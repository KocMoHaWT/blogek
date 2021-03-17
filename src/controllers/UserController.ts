import * as express from "express";
import * as jwt from "jsonwebtoken";
import envs from "../config";
import { UserRequest } from "../interfaces/userRequest";
import * as UserService from "../service/userService";

export const createUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const isExists = await UserService.isUserExist(req.body.email);
    if (isExists) return res.status(409).end();
    const user = await UserService.createUser(req.body);
    const accessToken = await jwt.sign({ payload: user.id }, envs.jwtSecret, {
      expiresIn: envs.accessExpire,
    });
    const refreshToken = await jwt.sign({ payload: user.id }, envs.jwtSecret, {
      expiresIn: envs.refreshExpire,
    });
    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return res.status(400).json({
      message: "shit",
    });
  }
};

export const isUserExist = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const email = req.params.email;
    const result = await UserService.isUserExist(email);
    return res.status(result ? 200 : 404).end();
  } catch (e) {
    return res.status(404).end();
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const user = await UserService.loginUser(req.body.email, req.body.password);
    const accessToken = await jwt.sign({ payload: user.id }, envs.jwtSecret, {
      expiresIn: envs.accessExpire,
    });
    const refreshToken = await jwt.sign({ payload: user.id }, envs.jwtSecret, {
      expiresIn: envs.refreshExpire,
    });
    await UserService.saveRefreshToken(refreshToken, user.id);

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return res.status(400).json({
      message: "shit",
    });
  }
};

export const RefreshTokens = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const user = await UserService.loginUser(req.body.email, req.body.password);
    const accessToken = await jwt.sign({ payload: user.id }, envs.jwtSecret, {
      expiresIn: envs.accessExpire,
    });
    const refreshToken = await jwt.sign({ payload: user.id }, envs.jwtSecret, {
      expiresIn: envs.refreshExpire,
    });
    await UserService.saveRefreshToken(user.id, refreshToken);

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return res.status(400).json({
      message: "shit",
    });
  }
};

export const getUser = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  delete req.user.created_at;
  delete req.user.delete_at;
  delete req.user.updated_at;
  delete req.user.refresh_token;
  return res.status(200).json({
    user: {
      firstName: req.user.first_name,
      lastName: req.user.last_name,
      ...req.user,
    },
  });
};
