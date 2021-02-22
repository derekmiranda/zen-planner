import { TasksActionTypes } from "../store/tasks/types";

export interface Task {
  description: string;
  id: number;
  uuid: string; // separate id to track task within client
  completed: boolean;
  isBig: boolean;
  taskDate: number; // datetime value
  orderId: number;
  focused: boolean;
}

// task that's added in client but not yet synced with server
export type ServerTask = Omit<Task, "uuid">;
export type UnsyncedTask = Omit<Task, "id">;
export type NewTask = Omit<
  Task,
  "id" | "uuid" | "completed" | "focused" | "orderId"
>;

export interface TaskMap {
  [id: string]: Task;
}

export interface AppState {
  tasks: TaskMap;
}

export type AppAction = TasksActionTypes;
