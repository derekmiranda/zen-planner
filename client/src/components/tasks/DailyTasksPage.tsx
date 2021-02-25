import { ReactNode, useEffect, useState } from "react";
import TaskContainer from "../../containers/tasks/TaskContainer";
import { NewTask, TaskMap } from "../../types";
import PlaceholderTask from "../tasks/PlaceholderTask";
import { DescriptionInput } from "../tasks/TaskSkeleton";

const PLACEHOLDERS = [
  "Add a big task to finish today",
  "Add a second big task",
  "Add a third big task",
];
const TEST_USER_ID = 1;

export interface AppStateProps {
  tasks: TaskMap;
}

export interface AppDispatchProps {
  onAddTask: (newTask: NewTask) => void;
  onLoadTasks: (userId: number) => void;
}

type AppProps = AppStateProps & AppDispatchProps;

const AppPresentation = ({ tasks, onAddTask, onLoadTasks }: AppProps) => {
  const [addingOtherTask, setAddOtherTask] = useState(false);
  const [newTaskDesc, updateNewTaskDesc] = useState("");

  useEffect(() => {
    onLoadTasks(TEST_USER_ID);
  }, [onLoadTasks]);

  const bigTasks: ReactNode[] = [];
  const otherTasks: ReactNode[] = [];
  Object.values(tasks).forEach((task) => {
    const taskEl = <TaskContainer key={task.uuid} task={task} />;
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
  const onAddOtherTask = () => {
    setAddOtherTask(!addingOtherTask);
  };
  const onUpdateNewTask = (newDesc: string) => {
    updateNewTaskDesc(newDesc);
  };
  const resetNewTaskInput = () => {
    setAddOtherTask(false);
    updateNewTaskDesc("");
  };
  const onSubmitOtherTask = () => {
    onAddTask({
      description: newTaskDesc,
      isBig: false,
      taskDate: Date.now(),
    });
    resetNewTaskInput();
  };

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
      <div className="add-other-tasks" onClick={onAddOtherTask}>
        +Add other tasks
      </div>
      {addingOtherTask && (
        <DescriptionInput
          description={newTaskDesc}
          onChange={onUpdateNewTask}
          onComplete={onSubmitOtherTask}
          onCancel={resetNewTaskInput}
        />
      )}
    </div>
  );
};

export default AppPresentation;
