import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import MeetingTopicList from '../MeetingTopicList/MeetingTopicList';
import MeetingForm from '../MeetingForm/MeetingForm';
import { Meeting } from '../../app/types';
import { convertToDate } from '../../utils/helpers/convertToDate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleMeeting, deleteMeeting, editMeeting } from '../../features/meetings/meetingsSlice';
import { filterTopics, selectTopicList } from '../../features/topics/topicsSlice';

const ITEM_HEIGHT = 48;

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.gray.main,
}));

export default function MeetingItem(props: Meeting) {
  const { meetingId, title, plannedAt, closed } = props;

  const dispatch = useAppDispatch();
  const topics = useAppSelector(selectTopicList);
  const activeTopics = [...topics].filter(({ comments }) => (
    comments.some((comment) => comment.meetingId === meetingId)
  ));
  const [curTitle, setCurTitle] = useState(title);
  const [curDate, setCurDate] = useState<Dayjs | null>(dayjs(plannedAt));
  const [status, setStatus] = useState('typing');
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState<string | false>(false);
  const [dotsAnchor, setDotsAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(dotsAnchor);

  const handleAccordionToggle =
    (meetingId: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      setIsExpanded(isExpanded ? meetingId : false);
    };

  const handleMenuClose = () => setDotsAnchor(null);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setDotsAnchor(e.currentTarget);
  };

  const handleEditOpen = () => {
    handleMenuClose();
    setIsEditing(true);
  };
  const handleEditClose = () => {
    setIsEditing(false);
    setStatus('typing');
    setCurTitle(title);
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
      editMeeting({
        meetingId,
        title: validTitle,
        plannedAt: curDate!.toDate().toString(),
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleMenuClose();
    dispatch(deleteMeeting(meetingId));
    dispatch(filterTopics(meetingId));
  };

  const handleMeetingToggle = () => {
    handleMenuClose();
    dispatch(
      toggleMeeting({
        meetingId,
        closed,
      })
    );
  };

  return (
    <>
      {isEditing ? (
        <MeetingForm
          sx={{ mt: 0.5, mb: 3 }}
          title={curTitle}
          status={status}
          onFormSubmit={handleSubmit}
          onInputChange={handleChange}
          onCloseClick={handleEditClose}
          buttonName="Save"
        >
          <DatePicker
            format="LL"
            value={curDate}
            onChange={(newValue) => setCurDate(newValue)}
            disablePast
          />
        </MeetingForm>
      ) : (
        <CustomAccordion
          expanded={isExpanded === meetingId}
          onChange={handleAccordionToggle(meetingId)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="meeting-content">
            <Grid container spacing={1}>
              <Grid item xs={12} container spacing={2} flexWrap="nowrap">
                {activeTopics.length > 0 && (
                  <Grid item>
                    <Chip label={activeTopics.length} size="small" />
                  </Grid>
                )}
                <Grid item>
                  <Typography variant="h6" component="p">
                    {title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip
                    variant={closed ? 'filled' : 'outlined'}
                    size="small"
                    label={closed ? 'passed' : 'upcoming'}
                    color={closed ? 'default' : 'primary'}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {convertToDate(plannedAt)}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <MeetingTopicList activeMeetingId={meetingId} activeTopics={activeTopics} />
            <Grid container spacing={1} justifyContent="flex-end" sx={{ mt: -6 }}>
              <Grid item>
                <IconButton
                  aria-label="Meeting menu"
                  size="small"
                  id="meeting-dots"
                  aria-controls={isMenuOpened ? 'meeting-menu' : undefined}
                  aria-expanded={isMenuOpened ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  id="meeting-menu"
                  MenuListProps={{
                    'aria-labelledby': 'meeting-dots',
                  }}
                  anchorEl={dotsAnchor}
                  open={isMenuOpened}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                    },
                  }}
                >
                  <MenuItem onClick={handleEditOpen}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleMeetingToggle}>
                    <ListItemIcon>
                      {closed ? (
                        <LockOpenOutlinedIcon fontSize="small" />
                        ) : (
                        <LockIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    {closed ? 'Open' : 'Close'}
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </AccordionDetails>
        </CustomAccordion>
      )}
    </>
  );
}
