
import { Blog } from "./blog";
import { User } from "./user";

export interface Post {
  id: string;
  title: string;
  urlTitle: string;
  body: string;
  author: User;
  blog: Blog;
  data: Date;
}