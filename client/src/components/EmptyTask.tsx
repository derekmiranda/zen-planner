import { Task } from "../types";
import TaskEl from "./TaskEl";

interface EmptyTaskProps {
  orderId: number;
  placeholder: string;
}

function EmptyTask({ orderId, placeholder }: EmptyTaskProps) {
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
      placeholder={placeholder}
      hideModifyModule={true}
    />
  );
}

export default EmptyTask;
