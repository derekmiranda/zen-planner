import { NewTask } from "../../types";
import TaskSkeleton from "./TaskSkeleton";

interface PlaceholderTaskProps {
  orderId: number;
  placeholder: string;
  onAddTask: (newTask: NewTask) => void;
}

function PlaceholderTask({ placeholder, onAddTask }: PlaceholderTaskProps) {
  const onUpdateDescription = (description: string) => {
    onAddTask({
      description,
      taskDate: Date.now(),
      isBig: true,
    });
  };

  return (
    <TaskSkeleton
      description={""}
      completed={false}
      focused={false}
      onUpdateDescription={onUpdateDescription}
      placeholder={placeholder}
      hasModifyModule={false}
    />
  );
}

export default PlaceholderTask;
