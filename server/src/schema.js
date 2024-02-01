/**
 * The readFileSync reads and returns the content of a file.
 * The Sync part of the function’s name means that the operation doesn’t return a Promise.
 * Instead, it blocks the program’s execution until a file is read.
 * We also need to convert the function’s return value to a UTF-8 string, using the toString function.
 */

import { readFileSync } from "fs";

export const readSchema = () => {
  return readFileSync("src/schema.graphql").toString("utf-8");
};
