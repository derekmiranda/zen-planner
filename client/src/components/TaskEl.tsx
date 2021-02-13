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
}

type TaskProps = TaskStateProps & TaskDispatchProps;

function TaskEl({ task, onUpdateTaskDesc, onToggleComplete }: TaskProps) {
  const { description, completed, uuid } = task;
  const toggleCompleteHandler = () => onToggleComplete(uuid);
  const updateTaskHandler = (newDescription: string) => {
    onUpdateTaskDesc(uuid, newDescription);
  };

  return (
    <TaskSkeleton
      description={description}
      completed={completed}
      onToggleComplete={toggleCompleteHandler}
      onUpdateDescription={updateTaskHandler}
    />
  );
}

export default TaskEl;
