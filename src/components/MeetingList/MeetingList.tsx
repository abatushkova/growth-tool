import React from 'react';
import { Box } from '@mui/material';
import MeetingItem from '../MeetingItem/MeetingItem';
import { meetings } from '../../store/fakeMeetings';

export default function MeetingList() {
  return (
    <Box>
      {meetings.map((meeting) => (
        <MeetingItem key={meeting.meetingId} {...meeting} />
      ))}
    </Box>
  );
}
