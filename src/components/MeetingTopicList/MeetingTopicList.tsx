import React, { useState } from 'react';
import {
  Grid,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MeetingTopicItem from '../MeetingTopicItem/MeetingTopicItem';

interface ITopic {
  topicId: number;
  title: string;
}
interface ITopicsProps {
  topics: ITopic[];
}

export default function MeetingTopicList({ topics }: ITopicsProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTopicClick = () => setIsAdding(true);
  const handleCancelClick = () => setIsAdding(false);

  return (
    <>
      {topics.length > 0 && (
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {topics.map((topic) => (
            <MeetingTopicItem key={topic.topicId} {...topic} />
          ))}
        </Stack>
      )}
      {isAdding ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="outlined-question"
              label="Topic"
              multiline
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <Button variant="contained">
                Add
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" onClick={handleCancelClick}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleAddTopicClick}
        >
          Add Topic
        </Button>
      )}
    </>
  );
}
