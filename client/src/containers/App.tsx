import { connect } from "react-redux";

import AppPresentation from "../components/AppPresentation";
import {
  AddTaskAction,
  ADD_TASK,
  CompleteTaskToggleAction,
  COMPLETE_TASK_TOGGLE,
  FocusTaskToggleAction,
  FOCUS_TASK_TOGGLE,
  RemoveTaskAction,
  REMOVE_TASK,
  UpdateTaskDescAction,
  UPDATE_TASK_DESC,
} from "../store/tasks/types";
import { AppState, Task } from "../types";

const mapStateToProps = ({ tasks }: AppState) => ({
  tasks,
});

const mapDispatchToProps = {
  onAddTask: (task: Task): AddTaskAction => {
    return {
      type: ADD_TASK,
      task,
    };
  },
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

const ConnectedApp = connect<{}, {}, typeof AppPresentation, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default ConnectedApp;
