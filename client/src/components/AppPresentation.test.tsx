import { render, screen } from "@testing-library/react";
import AppPresentation from "./AppPresentation";

const defaultProps = {
  tasks: {},
  onAddTask: () => {},
};

test("renders app header", () => {
  render(<AppPresentation {...defaultProps} />);
  const linkElement = screen.getByText("Zen Planner");
  expect(linkElement).toBeInTheDocument();
});
