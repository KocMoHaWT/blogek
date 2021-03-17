import { getManager } from "typeorm";
import { Blog } from "../interfaces/blog";

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

export const getBlog = async (id: string): Promise<Blog> => {
  console.log('param id', id);
  
  const res = await getManager().query(
    `
    SELECT * FROM blogs WHERE id = $1
  `,
    [id]
  );
  console.log('get blog',res);
  
  if (res.length !== 1) {
    throw new Error();
  }
  return res.pop();
};

export const updateBlog = async (
  blog: Blog
) => {
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
