import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Grid,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MeetingTopicItem from '../MeetingTopicItem/MeetingTopicItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTopic, selectTopicList } from '../../features/topics/topicsSlice';
import { createGuid } from '../../utils/helpers/createGuid';
import { FormView, MeetingId } from '../../app/types';

interface TopicListProps {
  activeMeetingId: MeetingId;
}

export default function MeetingTopicList(props: TopicListProps) {
  const { activeMeetingId } = props;
  const dispatch = useAppDispatch();
  const topics = useAppSelector(selectTopicList);
  const activeTopics = [...topics].filter(({ comments }) => (
    comments.every((comment) => comment.meetingId === activeMeetingId)
  ));
  const [isAdding, setIsAdding] = useState(false);
  const [curTitle, setCurTitle] = useState('');
  const [status, setStatus] = useState('typing');

  const handleAddOpen = () => setIsAdding(true);
  const handleAddClose = () => {
    setIsAdding(false);
    setStatus('typing');
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
        createdAt: dayjs().toString(),
        comments: [{
          commentId: createGuid(),
          createdAt: dayjs().toString(),
          formView: FormView.QA,
          meetingId: activeMeetingId,
        }],
      })
    );
    handleAddClose();
  };

  return (
    <>
      {activeTopics.length > 0 && (
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {activeTopics.map((topic) => (
            <MeetingTopicItem
              key={topic.topicId}
              activeMeetingId={activeMeetingId}
              {...topic}
            />
          ))}
        </Stack>
      )}
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
              helperText={status === 'error' ? 'Topic cannot be empty' : null}
              variant="outlined"
              placeholder="Enter Topic"
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
}
