import { TasksActionTypes } from "../store/tasks/types";

export interface Task {
  description: string;
  id: number;
  completed: boolean;
  isBig: boolean;
  taskDate: number; // datetime value
  orderId: number;
  focused: boolean;
}

export interface TaskMap {
  [id: string]: Task;
}

export interface AppState {
  tasks: TaskMap;
}

export type AppAction = TasksActionTypes;
