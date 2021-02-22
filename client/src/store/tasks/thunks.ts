import { Dispatch } from "redux";
import { loadTasks } from "../../api";
import { createUuid } from "../../lib/utils";
import { NewTask, Task, UnsyncedTask } from "../../types";
import {
  AddTaskAction,
  ADD_TASK,
  LoadedTasksAction,
  LOADED_TASKS,
} from "./types";

export function createNewTaskThunk(dispatch: Dispatch) {
  return (task: NewTask) => {
    (task as UnsyncedTask).uuid = createUuid();
    dispatch({
      type: ADD_TASK,
      task,
    } as AddTaskAction);
  };
}

export function createLoadTasksThunk(dispatch: Dispatch) {
  return async (userId: number) => {
    const loadedTasks = await loadTasks(userId);
    loadedTasks.forEach((task) => {
      (task as Task).uuid = createUuid();
    });
    dispatch({
      type: LOADED_TASKS,
      loadedTasks,
    } as LoadedTasksAction);
  };
}
