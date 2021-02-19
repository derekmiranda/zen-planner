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
