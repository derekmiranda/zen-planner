import { FC } from "react";

import "../App.css";
import { TaskMap } from "../types";

export interface AppProps {
  tasks: TaskMap;
}

const AppPresentation: FC<AppProps> = ({ tasks }: AppProps) => {
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
