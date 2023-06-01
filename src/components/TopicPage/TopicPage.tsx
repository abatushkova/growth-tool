import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Layout from '../Layout/Layout';
import TopicFormView from '../TopicFormView/TopicFormView';
import TopicCommentList from '../TopicCommentList/TopicCommentList';

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
  const [title, setTitle] = useState('Topic 1');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Layout>
      <Grid container alignItems="flex-start" spacing={1}>
        <Grid item xs>
          <Typography variant="h2" hidden>{title}</Typography>
          <CustomTextField
            variant="standard"
            id="topic-textfield"
            value={title}
            multiline
            fullWidth
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained">
            Save
          </Button>
        </Grid>
        <Grid item>
          <IconButton aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      <TopicFormView />

      {/* <Typography variant="body1">
        There are no comments yet on this topic.
      </Typography> */}
      <Typography variant="h3" sx={{ mt: 6, mb: 3 }}>
        Activity
      </Typography>
      <TopicCommentList />
    </Layout>
  );
}
