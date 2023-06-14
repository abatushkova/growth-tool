import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  Tooltip,
  IconButton,
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TopicCommentForm from '../TopicCommentForm/TopicCommentForm';
import { Comment } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteComment, editComment, selectActiveTopic } from '../../features/topics/topicsSlice';
import { convertToDatetime } from '../../utils/helpers/convertToDatetime';

export default function TopicCommentItem(props: Comment) {
  const {
    createdAt,
    question,
    comment,
    score,
    formView,
    commentId,
  } = props;

  const dispatch = useAppDispatch();
  const { topicId } = useAppSelector(selectActiveTopic);
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({ question, comment, score });

  const handleEditOpen = () => setIsEditing(true);
  const handleEditClose = () => {
    setIsEditing(false);
    setValues({ question, comment, score });
  };

  const handleDelete = () => {
    dispatch(
      deleteComment({
        topicId,
        commentId,
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = () => {
    dispatch(
      editComment({
        topicId,
        commentId,
        question: values.question,
        comment: values.comment,
        score: values.score,
      })
    );
    setIsEditing(false);
  };

  return (
    <Paper sx={{ p: 2}}>
      {isEditing ? (
        <TopicCommentForm
          formView={formView}
          question={values.question}
          comment={values.comment}
          score={values.score}
          onInputChange={handleChange}
        >
          <Grid item container spacing={1}>
            <Grid item>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" onClick={handleEditClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </TopicCommentForm>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} container>
            <Grid item xs>
              <Typography variant="body2" color="text.secondary">
                {convertToDatetime(createdAt)}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={handleEditOpen}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Delete">
                <IconButton size="small" onClick={handleDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {question && (
              <Typography variant="h6" component="p">
                {question}
              </Typography>
            )}
            {comment && (
              <Typography variant="body1">
                {comment}
              </Typography>
            )}
          </Grid>
          {score && (
            <Grid item xs={12}>
              <FormControl disabled>
                <RadioGroup row name="score" value={score}>
                  {[...Array(11)].map((_, index) => (index > 0 &&
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<Radio size="small" />}
                      label={index}
                      labelPlacement="bottom"
                      sx={{ mx: 1 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  );
}
