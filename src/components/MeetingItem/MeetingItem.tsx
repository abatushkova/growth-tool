import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { meetings } from '../../store/fakeMeetings';

const ITEM_HEIGHT = 48;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(0.5),
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.gray.main,
}));

interface ITopic {
  topicId: number;
  title: string;
}
interface IGuest {
  guestId: number;
}
interface IMeetingProps {
  meetingId: number;
  title: string;
  createdAt: string;
  closedAt: string;
  plannedAt: string;
  ownerId: number;
  guests: IGuest[];
  topics: ITopic[];
}

export default function MeetingItem(props: IMeetingProps) {
  const { meetingId, title, createdAt, topics, closedAt } = props;
  const [expanded, setExpanded] = useState<number | false>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleAccordion =
    (meetingId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? meetingId : false);
    };

  return (
    <CustomAccordion expanded={expanded === meetingId} onChange={toggleAccordion(meetingId)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} container flexWrap="nowrap" spacing={2}>
            {topics.length > 0 && (
              <Grid item>
                <Chip label={topics.length} size="small" />
              </Grid>
            )}
            <Grid item container spacing={2}>
            {/* <Grid item xs={11}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic meetingTitle"
                  variant="standard"
                  multiline
                  defaultValue={title}
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  sx={{ fontSize: '20px' }}
                />
              </Box> */}
              <Grid item>
                <Typography variant="h6" component="p" color="text.main">
                  {title}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Chip
                  variant="outlined"
                  color={ !closedAt ? 'primary': 'success' }
                  size="small"
                  label={ !closedAt ? 'upcoming': 'passed' }
                />
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {createdAt}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {topics.length > 0 && (
          <Stack spacing={0.5} sx={{ mb: 2 }}>
            {topics.map((topic) => (
              <Item key={topic.topicId}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs>
                    {topic.title}
                  </Grid>
                  <Grid item>
                    <Tooltip title="Carry-over">
                      {/* <IconButton size="small">
                        <AddLinkIcon fontSize="inherit" />
                      </IconButton> */}
                      <IconButton
                        size="small"
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <AddLinkIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                        },
                      }}
                    >
                      {meetings.map((meeting) => (
                        <MenuItem
                          key={meeting.meetingId}
                          selected={meeting.meetingId === 2}
                          onClick={handleClose}
                        >
                          {meeting.createdAt}
                        </MenuItem>
                      ))}
                    </Menu>
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
              </Item>
            ))}
          </Stack>
        )}
        <Button variant="text" startIcon={<AddIcon />}>
          Add Topic
        </Button>
        {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="outlined-question"
              label="Topic"
              multiline
              fullWidth
              size="small"
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <Button variant="contained">
                Add
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid> */}
      </AccordionDetails>
    </CustomAccordion>
  );
}
