import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  Tooltip,
  IconButton,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ICommentProps {
  commentId: number;
  createdAt: string;
  formView: string;
  question?: string;
  comment?: string;
  score?: number;
  meetingId: number;
}

export default function TopicCommentItem(props: ICommentProps) {
  const { createdAt, question, comment, score, formView } = props;
  const [scoreValue, setScoreValue] = useState(score);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditOpen = () => setIsEditing(true);
  const handleEditClose = () => setIsEditing(false);

  return (
    <Paper sx={{ p: 2}}>
      {isEditing ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="question"
              label="Question"
              multiline
              fullWidth
              size="small"
              value="Question"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="answer"
              label="Answer"
              multiline
              fullWidth
              size="small"
              value="Answer"
            />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <Button variant="contained">
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" onClick={handleEditClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs>
              <Typography variant="body2" color="text.secondary">
                {createdAt}
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
                <IconButton size="small">
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
                <RadioGroup
                  row
                  aria-labelledby="radio-buttons-group"
                  name="score"
                  value={scoreValue}
                >
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
