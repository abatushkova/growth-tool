import React from 'react';
import { Box, Typography } from '@mui/material';
import MeetingItem from '../MeetingItem/MeetingItem';
import { useAppSelector } from '../../app/hooks';
import { selectMeetings } from '../../features/meetings/meetingsSlice';

export default function MeetingList() {
  const meetings = useAppSelector(selectMeetings);

  return (
    <Box>
      {meetings.length > 0 ? (
        meetings.map((meeting) => (
          <MeetingItem key={meeting.meetingId} {...meeting} />
        ))
      ) : (
        <Typography variant="body1">
          This list is empty
        </Typography>
      )}
    </Box>
  );
}
