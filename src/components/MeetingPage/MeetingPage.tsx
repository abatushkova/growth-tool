import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Typography,
  Grid,
  Button,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Layout from '../Layout/Layout';
import MeetingMembers from '../MeetingMembers/MeetingMembers';
import MeetingList from '../MeetingList/MeetingList';
import MeetingForm from '../MeetingForm/MeetingForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMeeting } from '../../features/meetings/meetingsSlice';
import { selectGuest } from '../../features/persons/personsSlice';
import { createGuid } from '../../utils/helpers/createGuid';
import { selectUser } from '../../features/auth/authSlice';

const defaultTitle = 'New Meeting';
const tomorrow = dayjs().add(1, 'day');

export default function MeetingPage() {
  const dispatch = useAppDispatch();
  const guest = useAppSelector(selectGuest);
  const user = useAppSelector(selectUser);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState('typing');
  const [curTitle, setCurTitle] = useState(defaultTitle);
  const [curDate, setCurDate] = useState<Dayjs | null>(tomorrow);

  const handleCreateOpen = () => setIsCreating(true);
  const handleCreateClose = () => {
    setIsCreating(false);
    setStatus('typing');
    setCurTitle(defaultTitle);
    setCurDate(tomorrow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setCurTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validTitle = curTitle.trim();
    if (!validTitle) {
      setStatus('error');
      return;
    }

    dispatch(
      addMeeting({
        meetingId: createGuid(),
        title: validTitle,
        createdAt: dayjs().toDate().toString(),
        plannedAt: curDate!.toDate().toString(),
        ownerId: user.personId,
        guests: [{
          guestId: guest.personId,
        }],
        closed: false,
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
          <MeetingForm
            sx={{ mb: 4 }}
            title={curTitle}
            status={status}
            onFormSubmit={handleSubmit}
            onInputChange={handleChange}
            onCloseClick={handleCreateClose}
            buttonName="Create"
          >
            <DatePicker
              format="LL"
              value={curDate}
              onChange={(newDate) => setCurDate(newDate)}
              disablePast
            />
          </MeetingForm>
        ) : null}
        <MeetingList />
      </Layout>
    </>
  );
}
