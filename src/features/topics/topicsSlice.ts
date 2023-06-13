import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { Comment, MeetingId, Topic, TopicId } from "../../app/types";

type TopicEntity = {
  topicId: TopicId;
  title: string;
  meetingId: MeetingId;
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
      { payload }: PayloadAction<{ topicId: TopicId, meetingId: MeetingId}>
    ) {
      const index = state.topicList.findIndex((topic) => (
        topic.topicId === payload.topicId
      ));
      if (index !== -1) {
        const comments = state.topicList[index].comments.filter(
          ({ meetingId }) => meetingId !== payload.meetingId
        );
        state.topicList[index].comments = comments;

        const list = state.topicList.filter(({ comments }) => comments.length > 0);
        state.topicList = list;
      }
    },
    filterTopics(
      state: TopicsState,
      action: PayloadAction<MeetingId>
    ) {
      let list: Topic[] = [];

      state.topicList.forEach((topic) => {
        topic.comments = topic.comments.filter(({ meetingId }) => meetingId !== action.payload);
        list.push(topic);
      });

      list = state.topicList.filter(({ comments }) => comments.length > 0);
      state.topicList = list;
    },
    carryOverTopic(
      state: TopicsState,
      { payload }: PayloadAction<{ topicId: TopicId, comment: Comment}>
    ) {
      const index = state.topicList.findIndex((topic) => (
        topic.topicId === payload.topicId
      ));
      if (index !== -1) {
        const comments = state.topicList[index].comments;
        const hasComment = comments.some(({ meetingId }) => meetingId === payload.comment.meetingId);
  
        if (!hasComment) comments.push(payload.comment);
      }
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
      if (index !== -1) {
        state.topicList[index] = {
          ...state.topicList[index],
          title: payload.title,
        };
      }
    },
    addComment(
      state: TopicsState,
      { payload }: PayloadAction<{ topicId: TopicId, comment: Comment}>
    ) {
      const index = state.topicList.findIndex((topic) => (
        topic.topicId === payload.topicId
      ));
      if (index !== -1) {
        state.topicList[index].comments.push(payload.comment);
      }
    },
  },
});

export const {
  addTopic,
  deleteTopic,
  carryOverTopic,
  filterTopics,
  openActiveTopic,
  closeActiveTopic,
  editActiveTopic,
  addComment,
} = topicsSlice.actions;

export const topicsReducer = topicsSlice.reducer;
export const selectTopicList = (state: RootState) => state.topics.topicList;
export const selectActiveTopic = (state: RootState) => state.topics.activeTopic;
