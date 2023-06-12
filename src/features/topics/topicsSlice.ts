import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { Comment, MeetingId, Topic, TopicId } from "../../app/types";

type TopicEntity = {
  topicId: TopicId;
  title: string;
  meetingId?: MeetingId;
};

type TopicsState = {
  topicList: Topic[];
  activeTopic: TopicEntity;
};

const initialState: TopicsState = {
  topicList: loadState() || [],
  activeTopic: loadState() || {},
};

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic(
      state: TopicsState,
      action: PayloadAction<Topic>
    ) {
      state.topicList.push(action.payload);
    },
    deleteTopic(
      state: TopicsState,
    ) {
      state.topicList = state.topicList.filter(({ comments }) => (
        comments.length > 0
      ));
    },
    filterTopics(
      state: TopicsState,
      action: PayloadAction<MeetingId>
    ) {
      state.topicList = state.topicList.filter(({ comments }) => (
        // comments.length > 0 &&
        comments.some(({ meetingId }) => meetingId !== action.payload)
      ));
      state.topicList.forEach(({ comments }) => (
        comments.filter(({ meetingId }) => meetingId !== action.payload)
      ));
    },
    carryOverTopic(
      state: TopicsState,
      { payload }: PayloadAction<{ topicId: TopicId, comment: Comment}>
    ) {
      const index = state.topicList.findIndex((topic) => (
        topic.topicId === payload.topicId
      ));
      if (index === -1) return;

      const comments = state.topicList[index].comments;
      const hasComment = comments.some(({ meetingId }) => meetingId === payload.comment.meetingId);

      if (!hasComment) comments.push(payload.comment);
    },
    deleteComment(
      state: TopicsState,
      { payload }: PayloadAction<{ topicId: TopicId, meetingId: MeetingId}>
    ) {
      const index = state.topicList.findIndex((topic) => (
        topic.topicId === payload.topicId
      ));
      if (index === -1) return;

      state.topicList[index].comments = state.topicList[index].comments.filter(
        ({ meetingId }) => meetingId !== payload.meetingId
      );
      // state.topicList = state.topicList.filter(({ comments }) => (
      //   comments.length > 0
      // ));
    },
    openActiveTopic(
      state: TopicsState,
      { payload }: PayloadAction<TopicEntity>
    ) {
      state.activeTopic.topicId = payload.topicId;
      state.activeTopic.title = payload.title;
      state.activeTopic.meetingId = payload.meetingId;
    },
    closeActiveTopic(
      state: TopicsState,
    ) {
      state.activeTopic.topicId = '';
      state.activeTopic.title = '';
      state.activeTopic.meetingId = '';
    },
    editActiveTopic(
      state: TopicsState,
      { payload }: PayloadAction<TopicEntity>
    ) {
      const index = state.topicList.findIndex((topic) => (
        topic.topicId === payload.topicId
      ));
      if (index === -1) return;

      state.topicList[index] = {
        ...state.topicList[index],
        title: payload.title,
      };
    },
  },
});

export const {
  addTopic,
  deleteTopic,
  carryOverTopic,
  deleteComment,
  filterTopics,
  openActiveTopic,
  closeActiveTopic,
  editActiveTopic,
} = topicsSlice.actions;

export const topicsReducer = topicsSlice.reducer;
export const selectTopicList = (state: RootState) => state.topics.topicList;
export const selectActiveTopic = (state: RootState) => state.topics.activeTopic;
