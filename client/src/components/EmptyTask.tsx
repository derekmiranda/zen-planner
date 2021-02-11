import { Task } from "../types";
import TaskEl from "./TaskEl";

interface EmptyTaskProps {
  orderId: number;
  isPlaceholder?: boolean;
}

function EmptyTask({ orderId, isPlaceholder }: EmptyTaskProps) {
  const task: Task = {
    description: "",
    id: orderId,
    completed: false,
    isBig: true,
    taskDate: 0,
    orderId,
    focused: false,
  };
  return (
    <TaskEl
      task={task}
      onToggleComplete={() => {}}
      isPlaceholder={isPlaceholder}
      hideModifyModule={true}
    />
  );
}

export default EmptyTask;
