import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Layout from '../Layout/Layout';
import TopicFormView from '../TopicFormView/TopicFormView';
import TopicCommentList from '../TopicCommentList/TopicCommentList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeActiveTopic, editActiveTopic, selectActiveTopic } from '../../features/topics/topicsSlice';

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  '& .MuiInput-root': {
    padding: 0,
    fontSize: 30,
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      fontSize: 36,
    },
    '&::before': {
      borderBottom: 'none',
    },
  },
}));

export default function TopicPage() {
  const { title, topicId } = useAppSelector(selectActiveTopic);
  const dispatch = useAppDispatch();
  const [curTitle, setCurTitle] = useState(title);
  const [status, setStatus] = useState('typing');

  const handleClose = () => {
    dispatch(closeActiveTopic());
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
      editActiveTopic({
        title: validTitle,
        topicId,
      })
    );
    handleClose();
  };

  return (
    <Layout>
      <Grid
        container
        spacing={1}
        alignItems="flex-start"
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid item xs>
          <Typography variant="h2" hidden>{curTitle}</Typography>
          <CustomTextField
            error={status === 'error' && true}
            helperText={status === 'error' ? 'Title cannot be empty' : null}
            variant="standard"
            value={curTitle}
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Grid>
        <Grid item>
          <Tooltip title="Close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <TopicFormView />

      <Typography variant="h3" sx={{ mt: 6, mb: 3 }}>
        Activity
      </Typography>
      <Typography variant="body1">
        There are no comments yet on this topic.
      </Typography>
      {/* <TopicCommentList /> */}
    </Layout>
  );
}
