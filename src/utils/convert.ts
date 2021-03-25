import { Blog } from "../interfaces/blog";
import { Post } from "../interfaces/post";

export const convert = (
  key: string,
  replaceBy: string,
  responses: { [key: string]: string }[]
): { [key: string]: string | {} }[] => {
  if (!Array.isArray(responses)) {
    responses = [responses];
  }
  return responses.map((response) => {
    const entries = Object.entries(response);
    return entries.reduce((prev = { [key]: {} }, curr: [string, string]) => {
      // @ts-ignore
      if (!prev[key]) {
        // @ts-ignore
        prev[key] = {};
      }
      if (curr[0].includes(replaceBy)) {
        // @ts-ignore
        prev[key][curr[0].replace(replaceBy, "")] = curr[1];
      } else {
        // @ts-ignore
        prev[curr[0]] = curr[1];
      }
      return prev;
    }, {});
  });
};
