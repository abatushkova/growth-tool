import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { Meeting, PersonId, MeetingId } from "../../app/types";

type MeetingEntity = {
  meetingId: MeetingId;
  title: string;
  plannedAt: string;
};

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
    },
    deleteMeeting(
      state: MeetingsState,
      action: PayloadAction<MeetingId>
    ) {
      state.meetingList = state.meetingList.filter(({ meetingId }) => (
        meetingId !== action.payload
      ));
    },
    editMeeting(
      state: MeetingsState,
      { payload }: PayloadAction<MeetingEntity>
    ) {
      const index = state.meetingList.findIndex(({ meetingId }) => (
        meetingId === payload.meetingId
      ));

      if (index !== undefined) {
        state.meetingList[index] = {
          ...state.meetingList[index],
          title: payload.title,
          plannedAt: payload.plannedAt,
        };
      }
    },
    toggleMeeting(
      state: MeetingsState,
      { payload }: PayloadAction<{ meetingId: MeetingId, closed: boolean }>
    ) {
      const index = state.meetingList.findIndex(({ meetingId }) => (
        meetingId === payload.meetingId
      ));

      if (index !== undefined) {
        state.meetingList[index].closed = !state.meetingList[index].closed;
      }
    },
  },
});

export const {
  addMeeting,
  filterMeetings,
  deleteMeeting,
  editMeeting,
  toggleMeeting,
} = meetingsSlice.actions;

export const meetingsReducer = meetingsSlice.reducer;
export const selectMeetingList = (state: RootState) => state.meetings.meetingList;
