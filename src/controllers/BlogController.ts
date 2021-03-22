import * as express from "express";
import { UserRequest } from "../interfaces/userRequest";
import * as BlogService from "../service/blogService";

export const createBlog = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    await BlogService.createBlog(req.body, req.user.id);
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: "shit blog",
    });
  }
};

export const deleteBlog = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    await BlogService.deleteBlog(req.body);
  } catch (error) {
    return res.status(400).json({
      message: "shit with delete blog",
    });
  }
};

export const updateBlog = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    await BlogService.updateBlog(req.body);
  } catch (error) {
    return res.status(400).json({
      message: "shit with update blog",
    });
  }
};

export const getBlog = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    console.log("gddfgdf", req.params.id);

    const blog = await BlogService.getBlog(req.params.id);
    return res.status(200).json({
      blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "shit with getting shittiest blog",
    });
  }
};

export const getBlogs = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const blogs = await BlogService.getBlogs();
    return res.status(200).json({
      blogs,
    });
  } catch (error) {
    return res.status(404).json({
      message: "shit with getting shittiest blogs",
    });
  }
};

export const getBlogsPage = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { page, items } = req.params;
  if (!page || !items) {
    return res.status(401).json({
      message: "shit with params",
    });
  }
  try {
    const blogs = await BlogService.getBlogs(+page, +items);
    return res.status(200).json({
      blogs,
    });
  } catch (error) {
    return res.status(404).json({
      message: "shit with getting shittiest blogs",
    });
  }
};
