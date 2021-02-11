import { ReactNode } from "react";
import { Task, TaskMap } from "../types";
import EmptyTask from "./EmptyTask";
import TaskEl from "./TaskEl";

export interface AppStateProps {
  tasks: TaskMap;
}

export interface AppDispatchProps {
  onAddTask: (task: Task) => void;
  onToggleComplete: (taskId: number) => void;
}

type AppProps = AppStateProps & AppDispatchProps;

const AppPresentation = ({ tasks, onToggleComplete }: AppProps) => {
  const bigTasks: ReactNode[] = [];
  const otherTasks: ReactNode[] = [];
  Object.values(tasks).forEach((task, i) => {
    const taskEl = (
      <TaskEl key={i} task={task} onToggleComplete={onToggleComplete} />
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
      bigTasks.push(
        <EmptyTask
          key={orderId}
          orderId={orderId}
          isPlaceholder={orderId === 0}
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
