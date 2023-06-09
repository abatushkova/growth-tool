import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { meetingsReducer } from "../features/meetings/meetingsSlice";
import { personsReducer } from "../features/persons/personsSlice";
import { topicsReducer } from "../features/topics/topicsSlice";

export const rootReducer = combineReducers({
  persons: personsReducer,
  meetings: meetingsReducer,
  topics: topicsReducer,
  auth: authReducer,
});
