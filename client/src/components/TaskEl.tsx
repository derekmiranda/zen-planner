import { Task } from "../types";

export interface TaskStateProps {
  task: Task;
}

export interface TaskDispatchProps {
  onToggleComplete: (id: number) => void;
}

type TaskProps = TaskStateProps & TaskDispatchProps;

function TaskEl({ task, onToggleComplete }: TaskProps) {
  const { description, completed, id } = task;
  const toggleCompleteHandler = () => onToggleComplete(id);

  return (
    <div className="task__container">
      <div
        className="task__completion-indicator"
        onClick={toggleCompleteHandler}
        data-testid="completion-indicator"
      >
        {completed ? "\u2B24" : "\u25EF"}
      </div>
      <div className="task__description">{description}</div>
      <div className="modify__container">
        <div className="modify__btn">Focus</div>
        {"|"}
        <div className="modify__btn">Edit</div>
        {"|"}
        <div className="modify__btn">Delete</div>
      </div>
    </div>
  );
}

export default TaskEl;
