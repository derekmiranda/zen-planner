import { createUuid } from "../../lib/utils";
import {
  TasksActionTypes,
  TasksState,
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK_TOGGLE,
  FOCUS_TASK_TOGGLE,
  REORDER_TASKS,
} from "./types";

function tasksReducer(state: TasksState = {}, action: TasksActionTypes) {
  switch (action.type) {
    // TODO: start sync w/ server
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
        [newUuid]: action.task,
      };
    }
    case REMOVE_TASK: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((key) => {
        if (key !== action.uuid) {
          newState[key] = state[key];
        }
      });
      return newState;
    }
    case COMPLETE_TASK_TOGGLE: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((key) => {
        if (key === action.uuid) {
          newState[key] = {
            ...state[key],
            completed: !state[key].completed,
          };
        } else {
          newState[key] = state[key];
        }
      });
      return newState;
    }
    case FOCUS_TASK_TOGGLE: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((key) => {
        if (key === action.uuid) {
          newState[key] = {
            ...state[key],
            focused: !state[key].focused,
          };
        } else {
          newState[key] = state[key];
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
      Object.keys(state).forEach((key) => {
        if (!newState[key]) {
          newState[key] = state[key];
        }
      });
      return newState;
    }
    default:
      return state;
  }
}

export default tasksReducer;
