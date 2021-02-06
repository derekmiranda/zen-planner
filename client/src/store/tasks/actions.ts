import { Task } from "../../types";
import { ADD_TASK } from "./types";

export const addTask = (task: Task) => {
  return {
    type: ADD_TASK,
    task,
  };
};
