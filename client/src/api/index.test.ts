import { loadTasks } from "./index";
import runMockServer, { USER_ID, MOCK_TASKS } from "../lib/mock-server";
import { Task } from "../types";

describe("loadTasks", () => {
  beforeEach(() => {
    runMockServer();
  });

  test("loads tasks for a given user id", async () => {
    const tasks = await loadTasks(USER_ID);
    tasks.forEach((testTask: Task, i: number) => {
      const expectedTask = MOCK_TASKS[i];
      expect(testTask).toMatchObject(expectedTask);
    });
  });
});
