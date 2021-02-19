import { connect } from "react-redux";
import { Dispatch } from "redux";

import AppPresentation from "../components/AppPresentation";
import { AddTaskAction, ADD_TASK } from "../store/tasks/types";
import { AppState, Task } from "../types";

const mapStateToProps = ({ tasks }: AppState) => ({
  tasks,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddTask: (task: Task): AddTaskAction => {
      return dispatch({
        type: ADD_TASK,
        task,
      });
    },
  };
};

const ConnectedApp = connect<{}, {}, typeof AppPresentation, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default ConnectedApp;
