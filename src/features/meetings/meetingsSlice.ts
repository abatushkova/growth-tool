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
    deleteMeeting(
      state: MeetingsState,
      action: PayloadAction<MeetingId>
    ) {
      const list = state.meetingList.filter(({ meetingId }) => (
        meetingId !== action.payload
      ));
      state.meetingList = list;
    },
    editMeeting(
      state: MeetingsState,
      { payload }: PayloadAction<MeetingEntity>
    ) {
      const index = state.meetingList.findIndex(({ meetingId }) => (
        meetingId === payload.meetingId
      ));
      if (index !== -1) {
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
      if (index !== -1) {
        state.meetingList[index].closed = !state.meetingList[index].closed;
      }
    },
    filterMeetings(
      state: MeetingsState,
      action: PayloadAction<PersonId>
    ) {
      const list = state.meetingList.filter(({ guests }) => (
        guests[0].guestId !== action.payload
      ));
      state.meetingList = list;
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
