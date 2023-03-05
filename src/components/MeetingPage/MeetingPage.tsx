import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MeetingItem from '../MeetingItem/MeetingItem';
import { meetings } from '../../store/fakeMeetings';

export default function MeetingPage() {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h2" sx={{ my: 5 }} align="left">
            Meetings
          </Typography>
        </Grid>
        <Grid item xs></Grid>
        <Grid item>
          <Button variant="contained">
            New Meeting
          </Button>
        </Grid>
      </Grid>
      <Box>
        {meetings.map(meeting => (
          <MeetingItem key={meeting.id} {...meeting} />
        ))}
      </Box>
    </>
  );
}
