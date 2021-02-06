import { Task } from "../../types";
import { ADD_TASK } from "./types";

export const addTask = (task: Task) => {
  console.log("task", task);
  return {
    type: ADD_TASK,
    task,
  };
};
