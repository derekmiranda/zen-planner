import { connect } from "react-redux";

import AppPresentation from "./components/AppPresentation";
import { ADD_TASK } from "./store/tasks/types";
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
};

const ConnectedApp = connect<{}, {}, typeof AppPresentation, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default ConnectedApp;
