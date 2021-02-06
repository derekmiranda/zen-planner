import { Task } from "../../types";

export const ADD_TASK = "ADD_TASK";

export interface AddTaskAction {
  type: typeof ADD_TASK;
  task: Task;
}

export type TasksActionTypes = AddTaskAction; // | DeleteTaskAction;
