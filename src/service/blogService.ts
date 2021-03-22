import { getManager } from "typeorm";
import { Blog } from "../interfaces/blog";
import { convert } from "../utils/convert";
import { neededColumns } from "./userService";

export const createBlog = async (
  blog: Blog,
  authorId: string
): Promise<void> => {
  const res = await getManager().query(
    `
    INSERT INTO blogs (title, small_description, author_id)
    VALUES ($1, $2, $3)
  `,
    [blog.title, blog.small_description, authorId]
  );

  return res;
};

export const getBlog = async (id: string): Promise<{}> => {
  const res = await getManager().query(
    `
    SELECT ${neededColumns}, blogs.id, title, small_description, blogs.created_at FROM blogs 
    LEFT JOIN users as us
    ON blogs.author_id = us.id
    WHERE blogs.id = $1
  `,
    [id]
  );

  const convertedRes = await convert("author", "user_", res);

  if (res.length !== 1) {
    throw new Error();
  }
  return convertedRes.length === 1 ? convertedRes[0] : convertedRes;
};

export const updateBlog = async (blog: Blog) => {
  await getManager().query(
    `
    UPDATE blogs
    ${blog?.title ? "SET title = $2" : ""}
    ${blog?.small_description ? "SET small_description = $2" : ""}
    WHERE id = $3
  `,
    [blog.title, blog.small_description, blog.id]
  );
};

export const deleteBlog = async (id: string) => {
  await getManager().query(
    `
    Delete FROM blogs WHERE author_id = $1
  `,
    [id]
  );
};

export const getBlogs = async (page = -1, limit = -1): Promise<{}[]> => {
  const offset = (page - 1) * limit;
  const res = await getManager().query(
    `
    SELECT ${neededColumns}, blogs.id, title, small_description, blogs.created_at FROM blogs 
    LEFT JOIN users as us
    ON blogs.author_id = us.id
    ${page !== -1 ? "LIMIT $1" : ""}
    ${limit !== -1 ? "OFFSET $2" : ""}
  `,
    page === -1 || limit === -1 ? [] : [limit, offset]
  );
  return convert("author", "user_", res);
};

export const getBlogsPage = async (): Promise<{}[]> => {
  const res = await getManager().query(
    `
    SELECT ${neededColumns}, blogs.id, title, small_description, blogs.created_at FROM blogs 
    LEFT JOIN users as us
    ON blogs.author_id = us.id
  `
  );
  return convert("author", "user_", res);
};
