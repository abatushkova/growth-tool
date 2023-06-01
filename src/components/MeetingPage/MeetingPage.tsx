import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMeeting } from '../../features/meetings/meetingsSlice';
import { selectActivePerson } from '../../features/persons/personsSlice';
import { createGuid } from '../../utils/helpers/createGuid';
import { owner } from '../../utils/constants/auth';

const defaultTitle = 'New Meeting';
const tomorrow = dayjs().add(1, 'day');

export default function MeetingPage() {
  const dispatch = useAppDispatch();
  const selectedPerson = useAppSelector(selectActivePerson);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState('typing');
  const [title, setTitle] = useState(defaultTitle);
  const [date, setDate] = useState<Dayjs | null>(tomorrow);

  const handleCreateOpen = () => setIsCreating(true);
  const handleCreateClose = () => {
    setIsCreating(false);
    setStatus('typing');
    setTitle(defaultTitle);
    setDate(tomorrow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatus('error');
      return;
    }

    dispatch(
      addMeeting({
        meetingId: createGuid(),
        title,
        createdAt: dayjs().toString(),
        plannedAt: date!.toString(),
        ownerId: owner.personId,
        guests: [
          {
            guestId: selectedPerson.personId
          }
        ]
      })
    );
    handleCreateClose();
  };

  return (
    <>
      <MeetingMembers />
      <Divider />
      <Layout>
        <Grid container alignItems="flex-start" spacing={1}>
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
          <Grid
            container spacing={2}
            sx={{ mb: 4 }}
            component="form" noValidate
            onSubmit={handleSubmit}
          >
            <Grid item xs={12}>
              <TextField
                error={status === 'error' ?? 'true'}
                helperText={status === 'error' ? 'Title cannot be empty' : null}
                variant="outlined"
                placeholder="Enter Title"
                size="small" fullWidth
                value={title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <DatePicker
                format="LL"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                disablePast
              />
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <Button variant="contained" type="submit">
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
