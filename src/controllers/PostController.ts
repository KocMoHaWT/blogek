import * as express from "express";
import * as PostService from "../service/postService";
import { UserRequest } from "../interfaces/userRequest";

export const createPost = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    await PostService.createPost(req.body, req.user.id, req.body.blogId);
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: "shit with rights or you shit info",
    });
  }
};

export const deletePost = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    console.log('delete shit');
    const { id } = req.params;
    await PostService.deletePost(id);
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: "shit with rights or you shit info",
    });
  }
};

export const updatePost = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    await PostService.updatePost(req.body, req.body.blogId);
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: "shit with rights or you shit info",
    });
  }
};

export const getPost = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const post = await PostService.getPost(id);
    return res
      .status(200)
      .json({
        post,
      })
      .end();
  } catch (error) {
    return res.status(400).json({
      message: "shit with rights or you shit info",
    });
  }
};

export const getPosts = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    const { skip = 0, limit = 20 } = req.query;
    await PostService.getPosts(+skip, +limit);
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: "shit with rights or you shit info",
    });
  }
};

export const addComment = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    const { id, commentId } = req.params;
    await PostService.addComment(req.body.body, +id, req.user.id, commentId);
    return res.status(200).end();
  } catch {
    return res.status(400).json({
      message: "shit with adding your stupid comment",
    });
  }
}

export const toggleLike = async (
  req: UserRequest,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;

    await PostService.toggleLike(+id, req.user.id);
    return res.status(200).end();
  } catch {
    return res.status(400).json({
      message: "shit with adding your like",
    });
  }
}