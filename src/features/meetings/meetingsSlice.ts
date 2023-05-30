import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { Meeting } from "../../app/types";

type MeetingsState = {
  meetingList: Meeting[];
};

const initialState: MeetingsState = {
  meetingList: loadState() || [],
};

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    addMeeting(
      state: MeetingsState,
      action: PayloadAction<Meeting>
    ) {
      state.meetingList.push(action.payload);
    },
  },
});

export const {
  addMeeting,
} = meetingsSlice.actions;

export const meetingsReducer = meetingsSlice.reducer;
export const selectMeetings = (state: RootState) => state.meetings.meetingList;
