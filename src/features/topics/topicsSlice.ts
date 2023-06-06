import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { Topic, TopicId } from "../../app/types";

type TopicsState = {
  topicList: Topic[];
};

const initialState: TopicsState = {
  topicList: loadState() || [],
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
      action: PayloadAction<TopicId>
    ) {
      state.topicList = state.topicList.filter(({ topicId }) => (
        topicId !== action.payload
      ));
    },
  },
});

export const {
  addTopic,
  deleteTopic,
} = topicsSlice.actions;

export const topicsReducer = topicsSlice.reducer;
export const selectTopicList = (state: RootState) => state.topics.topicList;
