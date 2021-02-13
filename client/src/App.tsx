import { connect } from "react-redux";

import AppPresentation from "./components/AppPresentation";
import {
  ADD_TASK,
  COMPLETE_TASK_TOGGLE,
  UPDATE_TASK_DESC,
} from "./store/tasks/types";
import { AppState, Task } from "./types";

const mapStateToProps = ({ tasks }: AppState) => ({
  tasks,
});

const mapDispatchToProps = {
  onAddTask: (task: Task) => {
    return {
      type: ADD_TASK,
      task,
    };
  },
  onUpdateTaskDesc: (uuid: string, newDescription: string) => {
    return {
      type: UPDATE_TASK_DESC,
      uuid,
      newDescription,
    };
  },
  onToggleComplete: (taskId: number) => {
    return {
      type: COMPLETE_TASK_TOGGLE,
      taskId,
    };
  },
};

const ConnectedApp = connect<{}, {}, typeof AppPresentation, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default ConnectedApp;
