import { ADD_TASK, TasksActionTypes } from "./types";

function tasksReducer(state = {}, action: TasksActionTypes) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        [action.task.id]: action.task,
      };
    default:
      return state;
  }
}

export default tasksReducer;
