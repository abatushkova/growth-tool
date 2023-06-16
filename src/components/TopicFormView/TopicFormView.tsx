import React, { useState, memo } from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TopicCommentForm from '../TopicCommentForm/TopicCommentForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addComment, selectActiveTopic } from '../../features/topics/topicsSlice';
import { createGuid } from '../../utils/helpers/createGuid';
import { FormView } from '../../app/types';

const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    paddingInline: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: 0,
    backgroundColor: theme.palette.gray.main,
    textTransform: 'none',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary.main,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const initialValues = {
  question: '',
  comment: '',
  score: 0,
};

const TopicFormView = memo(function TopicFormView() {
  const dispatch = useAppDispatch();
  const activeTopic = useAppSelector(selectActiveTopic);
  const [formView, setFormView] = useState(FormView.QA);
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('pending');

  const handleFormViewToggle = (
    e: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    if (newValue !== null) {
      setFormView(FormView[newValue as keyof typeof FormView]);
      setStatus('pending');
      setValues(initialValues);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');

    const { name, value } = e.target;
    if (!value.trim()) setStatus('pending');
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAdd = () => {
    dispatch(
      addComment({
        topicId: activeTopic.topicId,
        comment: {
          commentId: createGuid(),
          createdAt: dayjs().toDate().toString(),
          formView,
          meetingId: activeTopic.meetingId,
          question: values.question ? values.question : undefined,
          comment: values.comment ? values.comment : undefined,
          score: values.score > 0 ? values.score : undefined,
        },
      })
    );
    setStatus('pending');
    setValues(initialValues);
  };

  return (
    <>
      <CustomToggleButtonGroup
        color="primary"
        size="small"
        value={formView}
        exclusive
        onChange={handleFormViewToggle}
        aria-label="Form view"
        sx={{ flexWrap: 'wrap' }}
      >
        <ToggleButton value="QA">
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Add QA
        </ToggleButton>
        <ToggleButton value="Score">
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Add Score
        </ToggleButton>
        <ToggleButton value="Comment">
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Add Comment
        </ToggleButton>
      </CustomToggleButtonGroup>

      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 2 }}>
          <TopicCommentForm
            formView={formView}
            question={values.question}
            comment={values.comment}
            score={values.score}
            onInputChange={handleChange}
          >
            <Grid item container spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  disabled={status === 'pending' && true}
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </TopicCommentForm>
        </Paper>
      </Box>
    </>
  );
});

export default TopicFormView;
