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
    case ADD_TASK: {
      return {
        ...state,
        [action.task.id]: action.task,
      };
    }
    case REMOVE_TASK: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((key) => {
        if (key !== "" + action.taskId) {
          newState[key] = state[key];
        }
      });
      return newState;
    }
    case COMPLETE_TASK_TOGGLE: {
      const newState = {} as TasksState;
      Object.keys(state).forEach((key) => {
        if (key === "" + action.taskId) {
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
        if (key === "" + action.taskId) {
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
        newState[reorder.id] = {
          ...state[reorder.id],
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
