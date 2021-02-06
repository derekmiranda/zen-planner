import { connect } from "react-redux";
import { Dispatch } from "redux";

import AppPresentation from "./components/AppPresentation";
import { ADD_TASK } from "./store/tasks/types";
import { Task, AppState, AppAction } from "./types";

// redux
const mapStateToProps = ({ tasks }: AppState) => ({
  tasks,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  onAddTask: (task: Task) =>
    dispatch({
      type: ADD_TASK,
      task,
    }),
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default ConnectedApp;
