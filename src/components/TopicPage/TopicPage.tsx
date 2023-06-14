import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Grid,
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
  const dispatch = useAppDispatch();
  const activeTopic = useAppSelector(selectActiveTopic);
  const [curTitle, setCurTitle] = useState(activeTopic.title);
  const [status, setStatus] = useState('typing');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setCurTitle(e.target.value);
  };

  const handleClose = () => {
    const validTitle = curTitle.trim();
    if (!validTitle) {
      setStatus('error');
      return;
    }

    dispatch(
      editActiveTopic({
        ...activeTopic,
        title: validTitle,
      })
    );
    dispatch(closeActiveTopic());
  };

  return (
    <Layout>
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
      >
        <Grid item xs>
          <Typography variant="h2" hidden>{curTitle}</Typography>
          <CustomTextField
            error={status === 'error' && true}
            helperText={status === 'error' ? 'Please fill out this field' : null}
            variant="standard"
            placeholder="Title"
            value={curTitle}
            fullWidth
            onChange={handleChange}
          />
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
      <TopicCommentList />
    </Layout>
  );
}
