import { Task, UnsyncedTask, NewTask } from "../../types";

export interface TasksState {
  [id: string]: Task | UnsyncedTask;
}

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK_DESC = "UPDATE_TASK_DESC";
export const REMOVE_TASK = "REMOVE_TASK";
export const COMPLETE_TASK_TOGGLE = "COMPLETE_TASK_TOGGLE";
export const FOCUS_TASK_TOGGLE = "FOCUS_TASK_TOGGLE";
export const REORDER_TASKS = "REORDER_TASKS";

export interface AddTaskAction {
  type: typeof ADD_TASK;
  task: NewTask;
}

export interface UpdateTaskDescAction {
  type: typeof UPDATE_TASK_DESC;
  uuid: string;
  newDescription: string;
}

export interface RemoveTaskAction {
  type: typeof REMOVE_TASK;
  uuid: string;
}

export interface CompleteTaskToggleAction {
  type: typeof COMPLETE_TASK_TOGGLE;
  uuid: string;
}

export interface FocusTaskToggleAction {
  type: typeof FOCUS_TASK_TOGGLE;
  uuid: string;
}

export interface ReorderTasksAction {
  type: typeof REORDER_TASKS;
  reorderedTasks: Pick<Task | UnsyncedTask, "uuid" | "orderId">[];
}

export type TasksActionTypes =
  | AddTaskAction
  | UpdateTaskDescAction
  | RemoveTaskAction
  | CompleteTaskToggleAction
  | FocusTaskToggleAction
  | ReorderTasksAction;
