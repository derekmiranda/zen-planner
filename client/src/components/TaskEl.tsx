import { ChangeEvent, useState } from "react";
import { Task } from "../types";

export interface TaskStateProps {
  task: Task;
  hideModifyModule?: boolean;
  isPlaceholder?: boolean;
}

export interface TaskDispatchProps {
  onToggleComplete: (id: number) => void;
}

type TaskProps = TaskStateProps & TaskDispatchProps;

const PLACEHOLDERS = [
  "Add a big task to finish today",
  "Add a second big task",
  "Add a third big task",
];

function Description({
  description,
  isPlaceholder,
  onClick,
}: {
  description: string;
  isPlaceholder: boolean;
  onClick: () => void;
}) {
  let descriptionClass = "task__description";
  if (isPlaceholder) {
    descriptionClass += " task__description--placeholder";
  }
  return (
    <div className={descriptionClass} onClick={onClick}>
      {isPlaceholder ? PLACEHOLDERS[0] : description}
    </div>
  );
}

function DescriptionInput({
  description,
  onChange,
  onComplete,
}: {
  description: string;
  onChange: (text: string) => void;
  onComplete: () => void;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <input
      className="task__description-input"
      value={description}
      onChange={handleChange}
      onBlur={onComplete}
    />
  );
}

function TaskEl({
  task,
  onToggleComplete,
  hideModifyModule = false,
  isPlaceholder = false,
}: TaskProps) {
  const { description, completed, id } = task;
  const toggleCompleteHandler = () => onToggleComplete(id);

  const [editingDescription, updateEditingDescription] = useState(false);
  const [localDescription, updateLocalDescription] = useState(description);

  const startEditing = () => updateEditingDescription(true);
  const stopEditing = () => updateEditingDescription(false);

  return (
    <div className="task__container">
      <div
        className="task__completion-indicator"
        onClick={toggleCompleteHandler}
        data-testid="completion-indicator"
      >
        {completed ? "\u2B24" : "\u25EF"}
      </div>
      {editingDescription ? (
        <DescriptionInput
          description={localDescription}
          onChange={updateLocalDescription}
          onComplete={stopEditing}
        />
      ) : (
        <Description
          description={description}
          isPlaceholder={isPlaceholder}
          onClick={startEditing}
        />
      )}
      {!hideModifyModule && (
        <div className="modify__container">
          <div className="modify__btn">Focus</div>
          {"|"}
          <div className="modify__btn">Edit</div>
          {"|"}
          <div className="modify__btn">Delete</div>
        </div>
      )}
    </div>
  );
}

export default TaskEl;
