import { connect } from "react-redux";
import { Dispatch } from "redux";

import AppPresentation from "../components/AppPresentation";
import {
  createLoadTasksThunk,
  createNewTaskThunk,
} from "../store/tasks/thunks";
import { AppState } from "../types";

const mapStateToProps = ({ tasks }: AppState) => ({
  tasks,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddTask: createNewTaskThunk(dispatch),
    onLoadTasks: createLoadTasksThunk(dispatch),
  };
};

const ConnectedApp = connect<{}, {}, typeof AppPresentation, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default ConnectedApp;
