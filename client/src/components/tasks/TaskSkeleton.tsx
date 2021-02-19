import { ChangeEvent, KeyboardEvent, useState } from "react";
import { noOp } from "../../lib/utils";

export interface TaskSkeletonStateProps {
  description: string;
  completed: boolean;
  focused: boolean;
  placeholder?: string;
  hasModifyModule?: boolean;
}

export interface TaskSkeletonDispatchProps {
  onUpdateDescription: (description: string) => void;
  onToggleComplete?: () => void;
  onToggleFocus?: () => void;
  onEdit?: () => void;
  onRemoveTask?: () => void;
}

type TaskSkeletonProps = TaskSkeletonStateProps & TaskSkeletonDispatchProps;

function Description({
  description,
  focused,
  onClick,
  placeholder,
}: {
  description: string;
  focused: boolean;
  onClick: () => void;
  placeholder?: string | undefined;
}) {
  let descriptionClass = "task__description";
  const isPlaceholder = placeholder !== undefined;
  if (isPlaceholder) {
    descriptionClass += " task__description--placeholder";
  } else if (focused) {
    descriptionClass += " task__description--focused";
  }
  return (
    <div className={descriptionClass} onClick={onClick}>
      {isPlaceholder ? placeholder : description}
    </div>
  );
}

export function DescriptionInput({
  description,
  onChange,
  onComplete,
  onCancel,
}: {
  description: string;
  onChange: (text: string) => void;
  onComplete: () => void;
  onCancel: () => void;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const handleKeys = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onComplete();
    } else if (event.key === "Escape") {
      onCancel();
    }
  };
  return (
    <div className="task__input-container">
      <input
        autoFocus
        className="task__description-input"
        value={description}
        onChange={handleChange}
        onBlur={onCancel}
        onKeyDown={handleKeys}
      />
      <button className="task__description-save" onClick={onComplete}>
        Save
      </button>
    </div>
  );
}

function TaskSkeleton({
  description,
  completed,
  placeholder,
  focused,
  onUpdateDescription = noOp,
  onToggleComplete = noOp,
  onToggleFocus = noOp,
  onRemoveTask = noOp,
  hasModifyModule = true,
}: TaskSkeletonProps) {
  const toggleCompleteHandler = () => onToggleComplete();

  const [editingDescription, updateEditingDescription] = useState(false);
  const [localDescription, updateLocalDescription] = useState(description);

  const startEditing = () => updateEditingDescription(true);
  const stopEditing = () => updateEditingDescription(false);
  const onSubmitBigTask = () => {
    updateEditingDescription(false);
    onUpdateDescription(localDescription);
  };

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
          onComplete={onSubmitBigTask}
          onCancel={stopEditing}
        />
      ) : (
        <Description
          focused={focused}
          description={description}
          placeholder={placeholder}
          onClick={startEditing}
        />
      )}
      {hasModifyModule && (
        <div className="modify__container">
          <div className="modify__btn" onClick={onToggleFocus}>
            Focus
          </div>
          {"|"}
          <div className="modify__btn">Edit</div>
          {"|"}
          <div className="modify__btn" onClick={onRemoveTask}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskSkeleton;
