import { Task, UnsyncedTask } from "../../types";
import TaskSkeleton from "./TaskSkeleton";

export interface TaskStateProps {
  task: Task | UnsyncedTask;
}

export interface TaskDispatchProps {
  onUpdateTaskDesc: (uuid: string, newDescription: string) => void;
  onToggleComplete: (uuid: string) => void;
  onToggleFocus: (uuid: string) => void;
  onRemoveTask: (uuid: string) => void;
}

type TaskProps = TaskStateProps & TaskDispatchProps;

function TaskEl({
  task,
  onUpdateTaskDesc,
  onToggleComplete,
  onToggleFocus,
  onRemoveTask,
}: TaskProps) {
  const { description, completed, focused, uuid } = task;
  const updateTaskHandler = (newDescription: string) => {
    onUpdateTaskDesc(uuid, newDescription);
  };
  const toggleCompleteHandler = () => onToggleComplete(uuid);
  const toggleFocusHandler = () => onToggleFocus(uuid);
  const removeTaskHandler = () => onRemoveTask(uuid);

  return (
    <TaskSkeleton
      description={description}
      completed={completed}
      focused={focused}
      onToggleComplete={toggleCompleteHandler}
      onToggleFocus={toggleFocusHandler}
      onUpdateDescription={updateTaskHandler}
      onRemoveTask={removeTaskHandler}
    />
  );
}

export default TaskEl;
