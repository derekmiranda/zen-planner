import { render, screen } from "@testing-library/react";
import { noOp } from "../../lib/utils";
import TaskEl from "./TaskEl";

const DEFAULT_TASK = {
  id: 1,
  uuid: '1',
  taskDate: Date.now(),
  description: "Other task",
  completed: false,
  isBig: false,
  orderId: 3,
  focused: false,
};

const DEFAULT_DISPATCH_PROPS = {
  onToggleComplete: noOp,
  onUpdateTaskDesc: noOp,
  onToggleFocus: noOp,
  onRemoveTask: noOp
}

test("task to render description", () => {
  render(<TaskEl task={DEFAULT_TASK} {...DEFAULT_DISPATCH_PROPS} />);
  const descEl = screen.getByText(DEFAULT_TASK.description);
  expect(descEl).toBeInTheDocument();
});

test("task shows incomplete status", () => {
  render(<TaskEl task={DEFAULT_TASK} {...DEFAULT_DISPATCH_PROPS} />);
  const incompleteIndicator = screen.getByText("\u25EF");
  expect(incompleteIndicator).toBeInTheDocument();
});

test("clicking toggle indicator triggers onToggleComplete", () => {
  const mockFn = jest.fn();
  render(<TaskEl task={DEFAULT_TASK} {...DEFAULT_DISPATCH_PROPS} onToggleComplete={mockFn} />);
  const incompleteIndicator = screen.getByTestId("completion-indicator");
  incompleteIndicator.click();
  expect(mockFn).toBeCalled();
});
