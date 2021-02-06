import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tasks from "./tasks/reducer";

const preloadedState = {
  tasks: {},
};

const reducer = combineReducers({
  tasks,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

export default store;
