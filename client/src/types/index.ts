import { TasksActionTypes } from "../store/tasks/types";

export interface Task {
  description: string;
  id: number;
}

export interface TaskMap {
  [id: string]: Task;
}

export interface AppState {
  tasks: TaskMap;
}

export type AppAction = TasksActionTypes;
