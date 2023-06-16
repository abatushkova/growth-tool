import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import MeetingItem from '../MeetingItem/MeetingItem';
import { useAppSelector } from '../../app/hooks';
import { selectMeetingList } from '../../features/meetings/meetingsSlice';
import { selectGuest } from '../../features/persons/personsSlice';

const MeetingList = memo(function MeetingList() {
  const { personId } = useAppSelector(selectGuest);
  const meetings = useAppSelector(selectMeetingList);
  const activeMeetings = [...meetings]
    .filter(({ guests }) => guests[0].guestId === personId)
    .sort((a, b) => new Date(a.plannedAt).getTime() - new Date(b.plannedAt).getTime());

  return (
    <Box>
      {activeMeetings.length > 0 ? (
        activeMeetings.map((meeting) => (
          <MeetingItem key={meeting.meetingId} {...meeting} />
        ))
      ) : (
        <Typography variant="body1">
          There are no meetings yet with this guest.
        </Typography>
      )}
    </Box>
  );
});

export default MeetingList;
