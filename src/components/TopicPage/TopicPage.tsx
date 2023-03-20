import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import ToggleButton from '@mui/material/ToggleButton';
import MuiToggleButton, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import Layout from '../Layout/Layout';

const topicItem = {
  padding: 2,
};

const CustomToggleButtonGroup = styled((props: ToggleButtonGroupProps) => (
  <MuiToggleButton {...props} />
))(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    minWidth: '4rem',
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

export default function TopicPage() {
  const [formView, setFormView] = useState('qa');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormView = (
    event: React.MouseEvent<HTMLElement>,
    newFormView: string | null,
  ) => {
    if (newFormView !== null) {
      setFormView(newFormView);
    }
  };

  return (
    <Layout>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h2">
            Topic 1
          </Typography>
        </Grid>
        <Grid item xs></Grid>
        <Grid item>
          <Button variant="contained">
            Save
          </Button>
        </Grid>
        <Grid item>
          <IconButton aria-label="close">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>


      <CustomToggleButtonGroup
        color="primary"
        size="small"
        value={formView}
        exclusive
        onChange={handleFormView}
        aria-label="form view"
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
        {formView === 'qa' && (
          <Paper sx={{ ...topicItem }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="outlined-question"
                  label="Question"
                  multiline
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="outlined-answer"
                  label="Answer"
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
                {/* <Grid item>
                  <Button variant="text">
                    Cancel
                  </Button>
                </Grid> */}
              </Grid>
            </Grid>
          </Paper>
        )}

        {formView === 'score' && (
          <Paper sx={{ ...topicItem }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="outlined-score-question"
                  label="Question"
                  multiline
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="outlined-score-question"
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
              <Grid item container spacing={1}>
                <Grid item>
                  <Button variant="contained">
                    Add
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button variant="text">
                    Cancel
                  </Button>
                </Grid> */}
              </Grid>
            </Grid>
          </Paper>
        )}

        {formView === 'comment' && (
          <Paper sx={{ ...topicItem }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="outlined-comment"
                  label="Comment"
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
                {/* <Grid item>
                  <Button variant="text">
                    Cancel
                  </Button>
                </Grid> */}
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box>

      {/* <Typography variant="h3" sx={{ mt: 6, mb: 3 }}>
        Details
      </Typography> */}

      <Typography variant="h3" sx={{ mt: 6, mb: 3 }}>
        Activity
      </Typography>
      {/* <Typography variant="body1" color="text.secondary">
        There are no comments yet on this topic.
      </Typography> */}
      <Stack spacing={3}>
        <Paper sx={{ ...topicItem }}>
          <Grid container spacing={1}>
            <Grid item xs={12} container spacing={1}>
              <Grid item xs>
                <Typography variant="body2" color="text.secondary">
                  Dec 17, 2022 at 15:00 PM
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Edit">
                  <IconButton size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="p">
                How useful do you find our new feature?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl disabled>
                <RadioGroup
                  row
                  aria-labelledby="radio-buttons-group"
                  name="score"
                  defaultValue="7"
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
          </Grid>
        </Paper>
        <Paper sx={{ ...topicItem }}>
          <Grid container spacing={1}>
            <Grid item xs={12} container spacing={1}>
              <Grid item xs>
                <Typography variant="body2" color="text.secondary">
                  Dec 17, 2022 at 10:43 AM
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Edit">
                  <IconButton size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                As layouts adapt to larger screens and form factors, apply flexible container dimensions to text fields. Set minimum and maximum values for margins, padding, and container dimensions as layouts scale so that typography adjusts for better reading experiences. 
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ ...topicItem }}>
          <Grid container spacing={1}>
            <Grid item xs={12} container spacing={1}>
              <Grid item xs>
                <Typography variant="body2" color="text.secondary">
                  Dec 16, 2022 at 11:28 AM (edited)
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Edit">
                  <IconButton size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="p">
                How are you today?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Oh, I am feeling much better today. My sore throat is gone and I feel more or less back to normal.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {/* <Paper sx={{ ...topicItem }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-question"
                label="Question"
                multiline
                fullWidth
                size="small"
                value="How are you today?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-answer"
                label="Answer"
                multiline
                fullWidth
                size="small"
                value="Oh, I am feeling much better today. My sore throat is gone and I feel more or less back to normal."
              />
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <Button variant="contained">
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button variant="text">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper> */}
      </Stack>
    </Layout>
  )
}
