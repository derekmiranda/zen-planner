import { fireEvent, render, screen } from "@testing-library/react";
import { noOp } from "../../lib/utils";
import { DescriptionInput } from "./TaskSkeleton";

describe("DescriptionInput", () => {
  test("Clicking on 'Save' button triggers onComplete", () => {
    const onCancel = jest.fn();
    const onComplete = jest.fn();
    render(
      <DescriptionInput
        description=""
        onCancel={onCancel}
        onComplete={onComplete}
        onChange={noOp}
      ></DescriptionInput>
    );
    const saveBtn = screen.getByRole("button");
    fireEvent(
      saveBtn,
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(onCancel).not.toBeCalled();
    expect(onComplete).toBeCalled();
  });
});
