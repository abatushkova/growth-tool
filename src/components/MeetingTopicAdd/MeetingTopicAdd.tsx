import React, { useState, memo } from 'react';
import dayjs from 'dayjs';
import {
  Grid,
  Button,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../app/hooks';
import { addTopic } from '../../features/topics/topicsSlice';
import { createGuid } from '../../utils/helpers/createGuid';
import { FormView, MeetingId } from '../../app/types';

interface TopicAddProps {
  activeMeetingId: MeetingId;
}

const MeetingTopicAdd = memo(function MeetingTopicAdd(props: TopicAddProps) {
  const { activeMeetingId } = props;

  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [curTitle, setCurTitle] = useState('');
  const [status, setStatus] = useState('typing');

  const handleAddOpen = () => setIsAdding(true);
  const handleAddClose = () => {
    setIsAdding(false);
    if (status !== 'typing') setStatus('typing');
    setCurTitle('');
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
      addTopic({
        topicId: createGuid(),
        title: validTitle,
        category: [''],
        createdAt: dayjs().toDate().toString(),
        comments: [{
          commentId: createGuid(),
          createdAt: dayjs().toDate().toString(),
          formView: FormView.QA,
          meetingId: activeMeetingId,
          initial: true,
        }],
      })
    );
    handleAddClose();
  };

  return (
    <>
      {isAdding ? (
        <Grid
          container
          spacing={2}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid item xs={12}>
            <TextField
              error={status === 'error' && true}
              helperText={status === 'error' ? 'Please fill out this field' : null}
              variant="outlined"
              label="Title"
              fullWidth
              size="small"
              value={curTitle}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <Button variant="contained" type="submit">
                Add
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" onClick={handleAddClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleAddOpen}
        >
          Add Topic
        </Button>
      )}
    </>
  );
});

export default MeetingTopicAdd;
