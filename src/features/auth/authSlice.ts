import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../../app/localStorage";
import { RootState } from "../../app/store";
import { Person } from "../../app/types";

type AuthState = {
  user: Person;
};

const initialState: AuthState = {
  user: loadState() || {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(
      state: AuthState,
      { payload }: PayloadAction<Person>
    ) {
      state.user.personId = payload.personId;
      state.user.personName = payload.personName;
    },
    logout(
      state: AuthState
    ) {
      state.user.personId = '';
      state.user.personName = '';
    },
  }
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;
