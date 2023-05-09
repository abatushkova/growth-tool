import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "./localStorage";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>
