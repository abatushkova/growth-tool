import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Button,
  Avatar,
  AvatarGroup,
  Divider,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import Layout from '../Layout/Layout';
import MeetingItem from '../MeetingItem/MeetingItem';
import { meetings } from '../../store/fakeMeetings';

const meetingAvatar = {
  width: {
    md: 54,
    xs: 44,
  },
  height: {
    md: 54,
    xs: 44,
  },
};

export default function MeetingPage() {
  return (
    <>
      <Layout pt={3} pb={3}>
        <Grid
          container
          spacing={{ md: 2, xs: 1}}
          alignItems="center"
          direction={{ md: 'row', xs: 'column' }}
        >
          <Grid item>
            <AvatarGroup>
              <Avatar src="" alt="Vlad" sx={{ ...meetingAvatar }} />
              <Avatar src="" alt="Alon" sx={{ ...meetingAvatar }} />
            </AvatarGroup>
          </Grid>
          <Grid item sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Typography variant="h3" component="p">
              Vlad
            </Typography>
            <CodeIcon sx={{ fontSize: 32, mx: 1 }} />
            <Typography variant="h3" component="p">
              Alon
            </Typography>
          </Grid>
        </Grid>
      </Layout>
      <Divider />
      <Layout>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <Typography variant="h2">
              Meetings
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">
              Create Meeting
            </Button>
          </Grid>
        </Grid>
        <Box>
          {meetings.map((meeting) => (
            <MeetingItem key={meeting.meetingId} {...meeting} />
          ))}
        </Box>
      </Layout>
    </>
  );
}
