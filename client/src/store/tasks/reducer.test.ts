import omit from "lodash/omit";
import { NewTask } from "../../types";
import tasksReducer from "./reducer";
import {
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK_TOGGLE,
  FOCUS_TASK_TOGGLE,
  REORDER_TASKS,
  UPDATE_TASK_DESC,
} from "./types";

const NOW = 1612919020297;
const DEFAULT_TASK = {
  id: 1,
  uuid: "1",
  description: "Test task",
  completed: false,
  isBig: true,
  focused: false,
  taskDate: NOW,
  orderId: 1,
};
const NEW_TASK: NewTask = omit(
  DEFAULT_TASK,
  "id",
  "completed",
  "focused",
  "orderId"
);

test("initial state", () => {
  expect(tasksReducer(undefined, {} as any)).toStrictEqual({});
});

test("can add a task", () => {
  expect(
    tasksReducer(
      {},
      {
        type: ADD_TASK,
        task: NEW_TASK,
      }
    )
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: omit(DEFAULT_TASK, "id"),
  });
});

test("can update a task", () => {
  const newDescription = "Task test";
  expect(
    tasksReducer(
      {
        [DEFAULT_TASK.uuid]: DEFAULT_TASK,
      },
      {
        type: UPDATE_TASK_DESC,
        uuid: DEFAULT_TASK.uuid,
        newDescription,
      }
    )
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: { ...DEFAULT_TASK, description: newDescription },
  });
});

test("will not update a task", () => {
  expect(
    tasksReducer(
      {
        [DEFAULT_TASK.uuid]: DEFAULT_TASK,
      },
      {
        type: UPDATE_TASK_DESC,
        uuid: DEFAULT_TASK.uuid,
        newDescription: "",
      }
    )
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: DEFAULT_TASK,
  });
});

test("will not add empty tasks", () => {
  const emptyTask = { ...NEW_TASK, description: "" };
  expect(
    tasksReducer(
      {},
      {
        type: ADD_TASK,
        task: emptyTask,
      }
    )
  ).toStrictEqual({});
});

test("can remove a task", () => {
  expect(
    tasksReducer(
      {
        [DEFAULT_TASK.uuid]: DEFAULT_TASK,
      },
      {
        type: REMOVE_TASK,
        uuid: DEFAULT_TASK.uuid,
      }
    )
  ).toStrictEqual({});
});

test("can complete a task", () => {
  expect(
    tasksReducer(
      {
        [DEFAULT_TASK.uuid]: DEFAULT_TASK,
      },
      {
        type: COMPLETE_TASK_TOGGLE,
        uuid: DEFAULT_TASK.uuid,
      }
    )
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: {
      ...DEFAULT_TASK,
      completed: true,
    },
  });
});

test("can uncomplete a task", () => {
  expect(
    tasksReducer(
      {
        [DEFAULT_TASK.uuid]: {
          ...DEFAULT_TASK,
          completed: true,
        },
      },
      {
        type: COMPLETE_TASK_TOGGLE,
        uuid: DEFAULT_TASK.uuid,
      }
    )
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: DEFAULT_TASK,
  });
});

test("can focus a task", () => {
  expect(
    tasksReducer(
      {
        [DEFAULT_TASK.uuid]: DEFAULT_TASK,
      },
      {
        type: FOCUS_TASK_TOGGLE,
        uuid: DEFAULT_TASK.uuid,
      }
    )
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: {
      ...DEFAULT_TASK,
      focused: true,
    },
  });
});

test("can unfocus a task", () => {
  expect(
    tasksReducer(
      {
        [DEFAULT_TASK.uuid]: {
          ...DEFAULT_TASK,
          focused: true,
        },
      },
      {
        type: FOCUS_TASK_TOGGLE,
        uuid: DEFAULT_TASK.uuid,
      }
    )
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: DEFAULT_TASK,
  });
});

test("can reorder tasks", () => {
  const task2 = {
    ...DEFAULT_TASK,
    description: "Doin things",
    id: 2,
    orderId: 2,
    uuid: "2",
  };
  const task3 = {
    ...DEFAULT_TASK,
    description: "Things for doin",
    id: 3,
    orderId: 3,
    uuid: "3",
  };
  const state = {
    [DEFAULT_TASK.uuid]: DEFAULT_TASK,
    "2": task2,
    "3": task3,
  };

  expect(
    tasksReducer(state, {
      type: REORDER_TASKS,
      reorderedTasks: [
        {
          uuid: "3",
          orderId: 2,
        },
        {
          uuid: "2",
          orderId: 3,
        },
      ],
    })
  ).toStrictEqual({
    [DEFAULT_TASK.uuid]: DEFAULT_TASK,
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
