import { Task } from "../../types";

export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const FOCUS_TASK = "FOCUS_TASK";
export const REORDER_TASKS = "REORDER_TASKS";

export interface AddTaskAction {
  type: typeof ADD_TASK;
  task: Task;
}

export type TasksActionTypes = AddTaskAction; // | DeleteTaskAction;
