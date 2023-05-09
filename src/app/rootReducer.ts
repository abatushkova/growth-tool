import { combineReducers } from "@reduxjs/toolkit";
import { personsReducer } from "../features/persons/personsSlice";

export const rootReducer = combineReducers({
  persons: personsReducer,
});
