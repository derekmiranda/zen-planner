import { render, screen } from "@testing-library/react";
import TaskEl from "./TaskEl";

const DEFAULT_TASK = {
  id: 1,
  taskDate: Date.now(),
  description: "Other task",
  completed: false,
  isBig: false,
  orderId: 3,
  focused: false,
};

test("task to render description", () => {
  render(<TaskEl task={DEFAULT_TASK} onToggleComplete={() => {}} />);
  const descEl = screen.getByText(DEFAULT_TASK.description);
  expect(descEl).toBeInTheDocument();
});

test("task shows incomplete status", () => {
  render(<TaskEl task={DEFAULT_TASK} onToggleComplete={() => {}} />);
  const incompleteIndicator = screen.getByText("\u25EF");
  expect(incompleteIndicator).toBeInTheDocument();
});

test("clicking toggle indicator triggers onToggleComplete", () => {
  const mockFn = jest.fn();
  render(<TaskEl task={DEFAULT_TASK} onToggleComplete={mockFn} />);
  const incompleteIndicator = screen.getByTestId("completion-indicator");
  incompleteIndicator.click();
  expect(mockFn).toBeCalled();
});
