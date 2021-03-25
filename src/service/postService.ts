import e = require("express");
import { getManager } from "typeorm";
import { Blog } from "../interfaces/blog";
import { Post } from "../interfaces/post";
import { convert } from "../utils/convert";
import { neededColumns } from "./userService";

const neededPostColumns =
  "title, url_title as urlTitle, body, posts.created_at";

export const createPost = async (
  post: Post,
  authorId: string,
  blogId: number
): Promise<void> => {
  const res = await getManager().query(
    `
    INSERT INTO posts (title, url_title, body, author_id, blog_id)
    VALUES ($1, $2, $3, $4, $5)
  `,
    [post.title, post.urlTitle, post.body, authorId, blogId]
  );

  return res;
};

export const getPost = async (id: string): Promise<{}> => {
  const res = await getManager().query(
    `
    SELECT ${neededPostColumns}, ${neededColumns} FROM posts
    LEFT JOIN users as us
    ON posts.author_id = us.id
    WHERE posts.id = $1
  `,
    [id]
  );
  if (res.length !== 1) {
    throw new Error();
  }
  const convertedPost = convert("author", "user_", res);
  return convertedPost[0];
};

export const updatePost = async (post: Post, blogId: number): Promise<void> => {
  const res = await getManager().query(
    `
    UPDATE posts 
    ${post?.title ? "SET title = $2" : ""}, 
    ${post?.urlTitle ? "SET url_title = $2" : ""}, 
    ${post?.body ? "SET body = $3" : ""}, 
      WHERE id = $4
  `,
    [post.title, post.urlTitle, post.body, blogId]
  );

  return res;
};

export const deletePost = async (id: string): Promise<void> => {
  const res = await getManager().query(
    `
    DELETE FROM posts WHERE $1
  `,
    [id]
  );

  return res;
};

export const getPosts = async (skip = 0, limit = 20): Promise<{}[]> => {
  const res = await getManager().query(
    `
    SELECT ${neededPostColumns}, ${neededColumns} 
    FROM posts 
    LIMIT $2
    OFFSET $1
  `,
    [skip, limit]
  );
  return convert("author", "user_", res);
};

export const getBlogPosts = async (
  blogId: string,
  skip = 0,
  limit = 20
): Promise<{}[]> => {
  const res = await getManager().query(
    `
    SELECT ${neededPostColumns}, ${neededColumns} 
    FROM posts 
    LEFT JOIN users as us
    ON posts.author_id = us.id
    WHERE blog_id = $1
    LIMIT $3
    OFFSET $2
  `,
    [blogId, skip, limit]
  );
  console.log("reыатыфлаофывлдтафлывдалдфотs", res);

  return convert("author", "user_", res);
};

export const hasPermission = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  const res = await getManager().query(
    `
    SELECT author_id as authorId 
    FROM posts 
    LIMIT $2
    OFFSET $1
  `,
    [postId]
  );
  if (!res.length) {
    throw new Error();
  }
  return res[0].authorId === userId;
};

export const addComment = async (
  body: string,
  postId: number,
  userId: string,
  commentId: string
): Promise<void> => {
  const res = await getManager().query(
    `
    INSERT INTO comments (body, post_id, user_id, comment_id)
    VALUES ($1, $2, $3, $4)
  `,
    [body, postId, userId, commentId]
  );
};

export const toggleLike = async (
  postId: number,
  userId: string,
): Promise<void> => {
  const searchedLikes = await getManager().query(
    `
    SELECT * FROM post_likes
    WHERE post_id = $1 and user_id = $2
  `,
    [postId, userId]
  );
  if (searchedLikes.length) {
    await getManager().query(
      `
      DELETE FROM post_likes
      WHERE id = $1
    `,
      [searchedLikes[0].id]
    );
  } else {
    await getManager().query(
      `
      INSERT INTO post_likes (post_id, user_id)
      VALUES ($1, $2)
    `,
      [postId, userId]
    );
  }
};

