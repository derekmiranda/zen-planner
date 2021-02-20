import { createUuid } from "../../lib/utils";
import { ServerTask, Task, UnsyncedTask } from "../../types";
import {
  TasksActionTypes,
  TasksState,
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK_TOGGLE,
  FOCUS_TASK_TOGGLE,
  REORDER_TASKS,
  UPDATE_TASK_DESC,
  LOADED_TASKS,
} from "./types";

function tasksReducer(
  state: TasksState = {},
  action: TasksActionTypes
): TasksState {
  switch (action.type) {
    case LOADED_TASKS: {
      const newState = { ...state };
      action.loadedTasks.forEach((task: ServerTask) => {
        const uuid = createUuid();
        // TODO: refactor
        (task as Task).uuid = uuid;
        newState[uuid] = task as Task;
      });
      return newState;
    }
    case ADD_TASK: {
      if (!action.task.description) return state;

      const newUuid = createUuid();
      Object.assign(action.task, {
        uuid: newUuid,
        focused: false,
        completed: false,
        // TODO: refine orderId determination
        orderId: Object.keys(state).length + 1,
      });
      return {
        ...state,
        [newUuid]: action.task as UnsyncedTask,
      };
    }
    case UPDATE_TASK_DESC: {
      if (!action.newDescription) return state;

      const newState = {} as TasksState;
      Object.keys(state).forEach((uuid) => {
        if (uuid === action.uuid) {
          newState[uuid] = {
            ...state[uuid],
            description: action.newDescription,
          };
        } else {
          newState[uuid] = state[uuid];
        }
      });
      return newState;
    }
    case REMOVE_TASK: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((uuid) => {
        if (uuid !== action.uuid) {
          newState[uuid] = state[uuid];
        }
      });
      return newState;
    }
    case COMPLETE_TASK_TOGGLE: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((uuid) => {
        if (uuid === action.uuid) {
          newState[uuid] = {
            ...state[uuid],
            completed: !state[uuid].completed,
          };
        } else {
          newState[uuid] = state[uuid];
        }
      });
      return newState;
    }
    case FOCUS_TASK_TOGGLE: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((uuid) => {
        if (uuid === action.uuid) {
          newState[uuid] = {
            ...state[uuid],
            focused: !state[uuid].focused,
          };
        } else {
          newState[uuid] = state[uuid];
        }
      });
      return newState;
    }
    case REORDER_TASKS: {
      const newState = {} as TasksState;
      action.reorderedTasks.forEach((reorder) => {
        newState[reorder.uuid] = {
          ...state[reorder.uuid],
          orderId: reorder.orderId,
        };
      });
      Object.keys(state).forEach((uuid) => {
        if (!newState[uuid]) {
          newState[uuid] = state[uuid];
        }
      });
      return newState;
    }
    default:
      return state;
  }
}

export default tasksReducer;
