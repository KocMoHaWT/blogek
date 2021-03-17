import { Post } from "./post";
import { User } from "./user";


export interface Blog {
  id: string;
  title: string;
  small_description: string;
  author: User;
  posts: Post[];
}