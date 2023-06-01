import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { Meeting, PersonId } from "../../app/types";

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
    filterMeetings(
      state: MeetingsState,
      action: PayloadAction<PersonId>
    ) {
      state.meetingList = state.meetingList.filter(({ guests }) => (
        guests[0].guestId !== action.payload
      ));
    }
  },
});

export const {
  addMeeting,
  filterMeetings,
} = meetingsSlice.actions;

export const meetingsReducer = meetingsSlice.reducer;
export const selectMeetingList = (state: RootState) => state.meetings.meetingList;
