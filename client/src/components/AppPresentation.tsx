import { ReactNode } from "react";
import { NewTask, TaskMap } from "../types";
import PlaceholderTask from "./PlaceholderTask";
import TaskEl from "./TaskEl";

const PLACEHOLDERS = [
  "Add a big task to finish today",
  "Add a second big task",
  "Add a third big task",
];

export interface AppStateProps {
  tasks: TaskMap;
}

export interface AppDispatchProps {
  onAddTask: (newTask: NewTask) => void;
  onToggleComplete: (uuid: string) => void;
}

type AppProps = AppStateProps & AppDispatchProps;

const AppPresentation = ({ tasks, onAddTask, onToggleComplete }: AppProps) => {
  const bigTasks: ReactNode[] = [];
  const otherTasks: ReactNode[] = [];
  Object.values(tasks).forEach((task, i) => {
    const taskEl = (
      <TaskEl
        key={i}
        task={task}
        onAddTask={onAddTask}
        onToggleComplete={onToggleComplete}
      />
    );
    if (task.isBig) {
      bigTasks.push(taskEl);
    } else {
      otherTasks.push(taskEl);
    }
  });

  // fill up big tasks with empty tasks
  if (bigTasks.length < 3) {
    const numEmptyTasks = 3 - bigTasks.length;
    for (let i = 0; i < numEmptyTasks; i++) {
      const orderId = bigTasks.length + i;
      const placeholder = i === 0 ? PLACEHOLDERS[orderId] : "";
      bigTasks.push(
        <PlaceholderTask
          key={orderId}
          orderId={orderId}
          placeholder={placeholder}
          onAddTask={onAddTask}
        />
      );
    }
  }

  const hasOtherTasks = !!otherTasks.length;

  return (
    <div className="app">
      <h1 className="app__header">Zen Planner</h1>
      <h2 className="tasks__big-tasks-header">Daily Big 3</h2>
      {bigTasks}
      {hasOtherTasks && (
        <>
          <h3 className="tasks__other-tasks-header">Other Tasks</h3>
          {otherTasks}
        </>
      )}
    </div>
  );
};

export default AppPresentation;
