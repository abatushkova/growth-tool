import React, { memo } from 'react';
import { Stack } from '@mui/material';
import MeetingTopicItem from '../MeetingTopicItem/MeetingTopicItem';
import { useAppSelector } from '../../app/hooks';
import { selectTopicList } from '../../features/topics/topicsSlice';
import { MeetingId, } from '../../app/types';

interface TopicListProps {
  activeMeetingId: MeetingId;
}

const MeetingTopicList = memo(function MeetingTopicList(props: TopicListProps) {
  const { activeMeetingId } = props;

  const topics = useAppSelector(selectTopicList);
  const activeTopics = [...topics].filter(({ comments }) => (
    comments.some((comment) => comment.meetingId === activeMeetingId)
  ));

  return (
    <>
      {activeTopics.length > 0 && (
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {activeTopics.map((topic) => (
            <MeetingTopicItem
              key={topic.topicId}
              activeMeetingId={activeMeetingId}
              {...topic}
            />
          ))}
        </Stack>
      )}
    </>
  );
});

export default MeetingTopicList;
