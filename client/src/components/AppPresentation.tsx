import "../App.css";
import { Task, TaskMap } from "../types";

export interface AppStateProps {
  tasks: TaskMap;
}

export interface AppDispatchProps {
  onAddTask: (task: Task) => void;
}

type AppProps = AppStateProps & AppDispatchProps;

const AppPresentation = ({ tasks }: AppProps) => {
  const Tasks = Object.values(tasks).map((task, i) => (
    <div key={i}>{task.description}</div>
  ));

  return (
    <div className="app">
      <h1 className="app__header">Zen Planner</h1>
      {Tasks}
    </div>
  );
};

export default AppPresentation;
