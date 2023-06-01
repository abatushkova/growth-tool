import React from 'react';
import { Box, Typography } from '@mui/material';
import MeetingItem from '../MeetingItem/MeetingItem';
import { useAppSelector } from '../../app/hooks';
import { selectMeetingList } from '../../features/meetings/meetingsSlice';
import { selectActivePerson } from '../../features/persons/personsSlice';

export default function MeetingList() {
  const { personId } = useAppSelector(selectActivePerson);
  const meetings = useAppSelector(selectMeetingList);
  const activeMeetings = [...meetings].filter(({ guests }) => (
    guests[0].guestId === personId
  ));

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
}
