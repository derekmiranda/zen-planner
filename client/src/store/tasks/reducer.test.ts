import omit from "lodash/omit";
import { createUuid } from "../../lib/utils";
import tasksReducer from "./reducer";
import {
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK_TOGGLE,
  FOCUS_TASK_TOGGLE,
  REORDER_TASKS,
} from "./types";

jest.mock("../../lib/utils");

const NOW = 1612919020297;
const UUID = createUuid();

const EXTRA_UUIDS = ["2", "3"];
const DEFAULT_TASK = {
  id: 1,
  uuid: UUID,
  description: "Test task",
  completed: false,
  isBig: true,
  focused: false,
  taskDate: NOW,
  orderId: 1,
};

test("initial state", () => {
  expect(tasksReducer(undefined, {} as any)).toStrictEqual({});
});

test("can add a task", () => {
  expect(
    tasksReducer(
      {},
      {
        type: ADD_TASK,
        task: omit(DEFAULT_TASK, "id", "focused", "uuid", "orderId"),
      }
    )
  ).toStrictEqual({
    [UUID]: omit(DEFAULT_TASK, "id"),
  });
});

test("can remove a task", () => {
  expect(
    tasksReducer(
      {
        [UUID]: DEFAULT_TASK,
      },
      {
        type: REMOVE_TASK,
        uuid: UUID,
      }
    )
  ).toStrictEqual({});
});

test("can complete a task", () => {
  expect(
    tasksReducer(
      {
        [UUID]: DEFAULT_TASK,
      },
      {
        type: COMPLETE_TASK_TOGGLE,
        uuid: UUID,
      }
    )
  ).toStrictEqual({
    [UUID]: {
      ...DEFAULT_TASK,
      completed: true,
    },
  });
});

test("can uncomplete a task", () => {
  expect(
    tasksReducer(
      {
        [UUID]: {
          ...DEFAULT_TASK,
          completed: true,
        },
      },
      {
        type: COMPLETE_TASK_TOGGLE,
        uuid: UUID,
      }
    )
  ).toStrictEqual({
    [UUID]: DEFAULT_TASK,
  });
});

test("can focus a task", () => {
  expect(
    tasksReducer(
      {
        [UUID]: DEFAULT_TASK,
      },
      {
        type: FOCUS_TASK_TOGGLE,
        uuid: UUID,
      }
    )
  ).toStrictEqual({
    [UUID]: {
      ...DEFAULT_TASK,
      focused: true,
    },
  });
});

test("can unfocus a task", () => {
  expect(
    tasksReducer(
      {
        [UUID]: {
          ...DEFAULT_TASK,
          focused: true,
        },
      },
      {
        type: FOCUS_TASK_TOGGLE,
        uuid: UUID,
      }
    )
  ).toStrictEqual({
    [UUID]: DEFAULT_TASK,
  });
});

test("can reorder tasks", () => {
  const task2 = {
    ...DEFAULT_TASK,
    description: "Doin things",
    id: 2,
    orderId: 2,
    uuid: EXTRA_UUIDS[0],
  };
  const task3 = {
    ...DEFAULT_TASK,
    description: "Things for doin",
    id: 3,
    orderId: 3,
    uuid: EXTRA_UUIDS[1],
  };
  const state = {
    [UUID]: DEFAULT_TASK,
    "2": task2,
    "3": task3,
  };

  expect(
    tasksReducer(state, {
      type: REORDER_TASKS,
      reorderedTasks: [
        {
          uuid: EXTRA_UUIDS[1],
          orderId: 2,
        },
        {
          uuid: EXTRA_UUIDS[0],
          orderId: 3,
        },
      ],
    })
  ).toStrictEqual({
    [UUID]: DEFAULT_TASK,
    "3": {
      ...task3,
      orderId: 2,
    },
    "2": {
      ...task2,
      orderId: 3,
    },
  });
});
