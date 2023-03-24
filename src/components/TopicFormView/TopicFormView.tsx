import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Box,
  Button,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

export default function TopicFormView() {
  const [formView, setFormView] = useState('qa');

  const handleFormViewToggle = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    if (newValue !== null) {
      setFormView(newValue);
    }
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
        <ToggleButton value="qa">
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Add QA
        </ToggleButton>
        <ToggleButton value="score">
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Add Score
        </ToggleButton>
        <ToggleButton value="comment">
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Add Comment
        </ToggleButton>
      </CustomToggleButtonGroup>

      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {(formView === 'qa' || formView === 'score') && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="question"
                  label="Question"
                  multiline
                  fullWidth
                  size="small"
                />
              </Grid>
            )}
            {formView === 'qa' && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="answer"
                  label="Answer"
                  multiline
                  fullWidth
                  size="small"
                />
              </Grid>
            )}
            {formView === 'score' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    id="score-comment"
                    label="Comment (optional)"
                    multiline
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="radio-buttons-group"
                      name="score"
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
            {formView === 'comment' && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="comment"
                  label="Comment"
                  multiline
                  fullWidth
                  size="small"
                />
              </Grid>
            )}
            <Grid item container spacing={1}>
              <Grid item>
                <Button variant="contained">
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
