import React from 'react';
import { Stack } from '@mui/material';
import TopicCommentItem from '../TopicCommentItem/TopicCommentItem';
import { comments } from '../../store/fakeComments';

export default function TopicCommentList() {
  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <TopicCommentItem key={comment.commentId} { ...comment } />
      ))}
    </Stack>
  );
}
