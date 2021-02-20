import { Dispatch } from "redux";
import { loadTasks } from "../../api";
import { LOADED_TASKS } from "./types";

export function createLoadTasksThunk(dispatch: Dispatch) {
  return async (userId: number) => {
    // TODO: dispatch loading tasks
    const loadedTasks = await loadTasks(userId);
    dispatch({
      type: LOADED_TASKS,
      loadedTasks,
    });
  };
}
