import { render, screen } from "@testing-library/react";
import { TaskMap } from "../types";
import AppPresentation from "./AppPresentation";

const defaultProps = {
  tasks: {},
  onAddTask: () => {},
  onToggleComplete: () => {},
};

const otherTasks: TaskMap = {
  "1": {
    id: 1,
    taskDate: Date.now(),
    description: "Other task",
    completed: false,
    isBig: false,
    orderId: 3,
    focused: false,
  },
};

test("renders app header", () => {
  render(<AppPresentation {...defaultProps} />);
  const linkElement = screen.getByText("Zen Planner");
  expect(linkElement).toBeInTheDocument();
});

test("renders Daily Big 3 header", () => {
  render(<AppPresentation {...defaultProps} />);
  const linkElement = screen.getByText("Daily Big 3");
  expect(linkElement).toBeInTheDocument();
});

test("doesn't render Other Tasks header if no other tasks present", () => {
  render(<AppPresentation {...defaultProps} />);
  const headerExists = screen.queryByText("Other Tasks");
  expect(headerExists).toBeNull();
});

test("renders Other Tasks header if other tasks present", () => {
  render(<AppPresentation {...defaultProps} tasks={otherTasks} />);
  const linkElement = screen.getByText("Other Tasks");
  expect(linkElement).toBeInTheDocument();
});
