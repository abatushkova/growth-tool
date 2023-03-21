import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Button,
  Avatar,
  AvatarGroup,
  Divider,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="outlined-question"
              defaultValue={'New Meeting'}
              multiline
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item>
            <DatePicker format="LL" />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <Button variant="contained">
                Create
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text">
                Cancel
              </Button>
            </Grid>
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
