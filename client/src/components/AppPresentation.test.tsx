import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { reducer } from '../store'
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
    uuid: '1',
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

test("renders prompt to add task", () => {
  render(<AppPresentation {...defaultProps} />);
  const linkElement = screen.getByText("Add a big task to finish today");
  expect(linkElement).toBeInTheDocument();
});

test("doesn't render Other Tasks header if no other tasks present", () => {
  render(<AppPresentation {...defaultProps} />);
  const headerExists = screen.queryByText("Other Tasks");
  expect(headerExists).toBeNull();
});

test("renders Other Tasks header if other tasks present", () => {
  const store = configureStore({
    reducer,
    preloadedState: {
      tasks: otherTasks
    }
  })

  render(
    <Provider store={store}>
      <AppPresentation {...defaultProps} tasks={otherTasks} />
    </Provider>
  );

  const linkElement = screen.getByText("Other Tasks");
  expect(linkElement).toBeInTheDocument();
});

test("has '+Add other tasks' button", () => {
  render(<AppPresentation {...defaultProps} />);
  const addOtherTasks = screen.getByText("+Add other tasks");
  expect(addOtherTasks).toBeInTheDocument();
});

test("Non-big task input doesn't exist on initial page state", () => {
  render(<AppPresentation {...defaultProps} />);
  const otherTaskInputExists = screen.queryByRole('textbox');
  expect(otherTaskInputExists).toBeNull()
});

test("clicking '+Add other tasks' opens input to add non-big task", () => {
  render(<AppPresentation {...defaultProps} />);

  // click on '+Add other tasks'
  const addOtherTasks = screen.getByText("+Add other tasks");
  addOtherTasks.click()

  // now check if other task input present
  const otherTaskInput = screen.getByRole('textbox');
  expect(otherTaskInput).toBeInTheDocument()
});
