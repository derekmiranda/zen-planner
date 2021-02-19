
import { connect } from "react-redux";

import TaskEl from '../components/tasks/TaskEl'
import {
  CompleteTaskToggleAction,
  COMPLETE_TASK_TOGGLE,
  FocusTaskToggleAction,
  FOCUS_TASK_TOGGLE,
  RemoveTaskAction,
  REMOVE_TASK,
  UpdateTaskDescAction,
  UPDATE_TASK_DESC,
} from "../store/tasks/types";

const mapDispatchToProps = {
  onUpdateTaskDesc: (
    uuid: string,
    newDescription: string
  ): UpdateTaskDescAction => {
    return {
      type: UPDATE_TASK_DESC,
      uuid,
      newDescription,
    };
  },
  onToggleComplete: (uuid: string): CompleteTaskToggleAction => {
    return {
      type: COMPLETE_TASK_TOGGLE,
      uuid,
    };
  },
  onToggleFocus: (uuid: string): FocusTaskToggleAction => {
    return {
      type: FOCUS_TASK_TOGGLE,
      uuid,
    };
  },
  onRemoveTask: (uuid: string): RemoveTaskAction => {
    return {
      type: REMOVE_TASK,
      uuid,
    };
  },
};

const connector = connect(
  null,
  mapDispatchToProps
);

export default connector(TaskEl);
