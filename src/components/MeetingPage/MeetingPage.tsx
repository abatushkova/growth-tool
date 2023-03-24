import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Layout from '../Layout/Layout';
import MeetingMembers from '../MeetingMembers/MeetingMembers';
import MeetingList from '../MeetingList/MeetingList';

export default function MeetingPage() {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateOpen = () => setIsCreating(true);
  const handleCreateClose = () => setIsCreating(false);

  return (
    <>
      <MeetingMembers />
      <Divider />
      <Layout>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <Typography variant="h2">
              Meetings
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleCreateOpen}>
              Create Meeting
            </Button>
          </Grid>
        </Grid>

        {isCreating ? (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="new-meeting-title"
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
                <Button variant="text" onClick={handleCreateClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : null}

        <MeetingList />
      </Layout>
    </>
  );
}
