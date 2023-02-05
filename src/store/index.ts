import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoApi from "./apis/todoApi";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

