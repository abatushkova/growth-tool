import React from 'react';
import { Stack, Typography } from '@mui/material';
import TopicCommentItem from '../TopicCommentItem/TopicCommentItem';
import { useAppSelector } from '../../app/hooks';
import { selectActiveTopic, selectTopicList } from '../../features/topics/topicsSlice';

export default function TopicCommentList() {
  const { topicId } = useAppSelector(selectActiveTopic);
  const topics = useAppSelector(selectTopicList);
  const activeComments = [...topics].find((topic) => (
    topic.topicId === topicId
  ))?.comments.filter((comment) => !comment.initial);

  return (
    <>
      {activeComments && activeComments.length > 0 ? (
        <Stack spacing={2}>
          {activeComments.map((comment) => (
            <TopicCommentItem key={comment.commentId} { ...comment } />
          ))}
        </Stack>
      ) : (
        <Typography variant="body1">
          There are no comments yet on this topic.
        </Typography>
      )}
    </>
  );
}
