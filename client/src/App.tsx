import { connect } from "react-redux";

import AppPresentation from "./components/AppPresentation";
import { addTask } from "./store/tasks/actions";
import { AppState } from "./types";

const mapStateToProps = ({ tasks }: AppState) => ({
  tasks,
});

const mapDispatchToProps = {
  onAddTask: addTask,
};

const ConnectedApp = connect<{}, {}, typeof AppPresentation, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default ConnectedApp;
