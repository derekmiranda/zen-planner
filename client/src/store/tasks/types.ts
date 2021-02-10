import { Task } from "../../types";

export interface TasksState {
  [id: string]: Task;
}

export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const COMPLETE_TASK_TOGGLE = "COMPLETE_TASK_TOGGLE";
export const FOCUS_TASK_TOGGLE = "FOCUS_TASK_TOGGLE";
export const REORDER_TASKS = "REORDER_TASKS";

export interface AddTaskAction {
  type: typeof ADD_TASK;
  task: Task;
}

export interface RemoveTaskAction {
  type: typeof REMOVE_TASK;
  taskId: number;
}

export interface CompleteTaskToggleAction {
  type: typeof COMPLETE_TASK_TOGGLE;
  taskId: number;
}

export interface FocusTaskToggleAction {
  type: typeof FOCUS_TASK_TOGGLE;
  taskId: number;
}

export interface ReorderTasksAction {
  type: typeof REORDER_TASKS;
  reorderedTasks: Pick<Task, "id" | "orderId">[];
}

export type TasksActionTypes =
  | AddTaskAction
  | RemoveTaskAction
  | CompleteTaskToggleAction
  | FocusTaskToggleAction
  | ReorderTasksAction;
