import { combineReducers } from "@reduxjs/toolkit";
import { meetingsReducer } from "../features/meetings/meetingsSlice";
import { personsReducer } from "../features/persons/personsSlice";

export const rootReducer = combineReducers({
  persons: personsReducer,
  meetings: meetingsReducer,
});
