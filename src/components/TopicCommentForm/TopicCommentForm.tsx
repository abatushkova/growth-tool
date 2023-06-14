import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { FormView } from '../../app/types';

interface FormProps {
  children?: React.ReactNode;
  formView: FormView;
  question?: string;
  comment?: string;
  score?: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TopicCommentForm(props: FormProps) {
  const {
    children,
    formView,
    question,
    comment,
    score,
    onInputChange,
  } = props;

  return (
    <Grid container spacing={2}>
      {(formView === 'QA' || formView === 'Score') && (
        <>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="question"
              label="Question"
              multiline
              fullWidth
              size="small"
              value={question}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="comment"
              label={formView === 'QA' ? 'Answer' : 'Comment (optional)'}
              multiline
              fullWidth
              size="small"
              value={comment}
              onChange={onInputChange}
            />
          </Grid>
        </>
      )}
      {formView === 'Score' && (
        <>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                row
                name="score"
                value={score}
                onChange={onInputChange}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(score => (
                  <FormControlLabel
                    key={score}
                    value={score}
                    control={<Radio size="small" />}
                    label={score}
                    labelPlacement="bottom"
                    sx={{ mx: 1 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </>
      )}
      {formView === 'Comment' && (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            name="comment"
            label="Comment"
            multiline
            fullWidth
            size="small"
            value={comment}
            onChange={onInputChange}
          />
        </Grid>
      )}
      {children}
    </Grid>
  );
}
