import { connect, RootStateOrAny } from "react-redux";
import { Dispatch } from "redux";

import AppPresentation, {
  AppDispatchProps,
} from "../components/DailyTasksPage";
import {
  createLoadTasksThunk,
  createNewTaskThunk,
} from "../store/tasks/thunks";

const mapStateToProps = ({ tasks }: RootStateOrAny) => ({
  tasks,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddTask: createNewTaskThunk(dispatch),
    onLoadTasks: createLoadTasksThunk(dispatch),
  };
};

const DailyTasksContainer = connect<
  ReturnType<typeof mapStateToProps>,
  AppDispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps
)(AppPresentation);

export default DailyTasksContainer;
