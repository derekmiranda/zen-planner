import tasksReducer from "./reducer";
import {
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK_TOGGLE,
  FOCUS_TASK_TOGGLE,
  REORDER_TASKS,
} from "./types";

const NOW = 1612919020297;
const DEFAULT_TASK = {
  id: 1,
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
        task: DEFAULT_TASK,
      }
    )
  ).toStrictEqual({
    "1": DEFAULT_TASK,
  });
});

test("can remove a task", () => {
  expect(
    tasksReducer(
      {
        "1": DEFAULT_TASK,
      },
      {
        type: REMOVE_TASK,
        taskId: 1,
      }
    )
  ).toStrictEqual({});
});

test("can complete a task", () => {
  expect(
    tasksReducer(
      {
        "1": DEFAULT_TASK,
      },
      {
        type: COMPLETE_TASK_TOGGLE,
        taskId: 1,
      }
    )
  ).toStrictEqual({
    "1": {
      ...DEFAULT_TASK,
      completed: true,
    },
  });
});

test("can uncomplete a task", () => {
  expect(
    tasksReducer(
      {
        "1": {
          ...DEFAULT_TASK,
          completed: true,
        },
      },
      {
        type: COMPLETE_TASK_TOGGLE,
        taskId: 1,
      }
    )
  ).toStrictEqual({
    "1": DEFAULT_TASK,
  });
});

test("can focus a task", () => {
  expect(
    tasksReducer(
      {
        "1": DEFAULT_TASK,
      },
      {
        type: FOCUS_TASK_TOGGLE,
        taskId: 1,
      }
    )
  ).toStrictEqual({
    "1": {
      ...DEFAULT_TASK,
      focused: true,
    },
  });
});

test("can unfocus a task", () => {
  expect(
    tasksReducer(
      {
        "1": {
          ...DEFAULT_TASK,
          focused: true,
        },
      },
      {
        type: FOCUS_TASK_TOGGLE,
        taskId: 1,
      }
    )
  ).toStrictEqual({
    "1": DEFAULT_TASK,
  });
});

test("can reorder tasks", () => {
  const task2 = {
    ...DEFAULT_TASK,
    description: "Doin things",
    id: 2,
    orderId: 2,
  };
  const task3 = {
    ...DEFAULT_TASK,
    description: "Things for doin",
    id: 3,
    orderId: 3,
  };
  const state = {
    "1": DEFAULT_TASK,
    "2": task2,
    "3": task3,
  };

  expect(
    tasksReducer(state, {
      type: REORDER_TASKS,
      reorderedTasks: [
        {
          id: 3,
          orderId: 2,
        },
        {
          id: 2,
          orderId: 3,
        },
      ],
    })
  ).toStrictEqual({
    "1": DEFAULT_TASK,
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
