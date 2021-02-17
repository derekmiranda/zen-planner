import { Task, UnsyncedTask } from "../types";
import TaskSkeleton from "./TaskSkeleton";

export interface TaskStateProps {
  task: Task | UnsyncedTask;
  placeholder?: string | undefined;
  hideModifyModule?: boolean;
}

export interface TaskDispatchProps {
  onUpdateTaskDesc: (uuid: string, newDescription: string) => void;
  onToggleComplete: (uuid: string) => void;
  onToggleFocus: (uuid: string) => void;
}

type TaskProps = TaskStateProps & TaskDispatchProps;

function TaskEl({
  task,
  onUpdateTaskDesc,
  onToggleComplete,
  onToggleFocus,
}: TaskProps) {
  const { description, completed, focused, uuid } = task;
  const toggleCompleteHandler = () => onToggleComplete(uuid);
  const toggleFocusHandler = () => onToggleFocus(uuid);
  const updateTaskHandler = (newDescription: string) => {
    onUpdateTaskDesc(uuid, newDescription);
  };

  return (
    <TaskSkeleton
      description={description}
      completed={completed}
      focused={focused}
      onToggleComplete={toggleCompleteHandler}
      onToggleFocus={toggleFocusHandler}
      onUpdateDescription={updateTaskHandler}
    />
  );
}

export default TaskEl;
