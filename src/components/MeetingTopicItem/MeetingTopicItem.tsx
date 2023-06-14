import React, { useState } from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Paper,

} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { FormView, MeetingId, Topic } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { carryOverTopic, deleteTopic, openActiveTopic } from '../../features/topics/topicsSlice';
import { selectMeetingList } from '../../features/meetings/meetingsSlice';
import { convertToDate } from '../../utils/helpers/convertToDate';
import { selectGuest } from '../../features/persons/personsSlice';
import { createGuid } from '../../utils/helpers/createGuid';

const ITEM_HEIGHT = 48;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(0.5),
}));

interface TopicItemProps extends Topic {
  activeMeetingId: MeetingId;
}

export default function MeetingTopicItem(props: TopicItemProps) {
  const { title, topicId, activeMeetingId } = props;

  const dispatch = useAppDispatch();
  const { personId } = useAppSelector(selectGuest);
  const meetings = useAppSelector(selectMeetingList);
  const upcomingMeetings = [...meetings].filter(({ closed, meetingId, guests }) => (
    !closed
    && meetingId !== activeMeetingId
    && guests[0].guestId === personId
  ));
  const [datesAnchor, setDatesAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(datesAnchor);

  const handleDatesClose = () => setDatesAnchor(null);
  const handleDatesOpen = (e: React.MouseEvent<HTMLElement>) => {
    setDatesAnchor(e.currentTarget);
  };

  const handleDelete = () => {
    dispatch(
      deleteTopic({
        topicId,
        meetingId: activeMeetingId,
      })
    );
  };

  const handleCarryOver = (id: MeetingId) => {
    dispatch(
      carryOverTopic({
        topicId,
        comment: {
          commentId: createGuid(),
          createdAt: dayjs().toDate().toString(),
          formView: FormView.QA,
          meetingId: id,
          initial: true,
        }
      })
    );
    handleDatesClose();
  };

  const handleTopicSelect = () => {
    dispatch(
      openActiveTopic({
        topicId,
        title,
        meetingId: activeMeetingId,
      })
    );
  };

  return (
    <Item>
      <Grid container alignItems="center">
        <Grid item xs>
          {title}
        </Grid>
        <Grid item>
          <Tooltip title="Open">
            <IconButton size="small" onClick={handleTopicSelect}>
              <ArticleOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Carry-over">
            <IconButton
              size="small"
              id="dates-btn"
              aria-controls={isMenuOpened ? 'dates-menu' : undefined}
              aria-expanded={isMenuOpened ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleDatesOpen}
            >
              <AddLinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            id="dates-menu"
            MenuListProps={{
              'aria-labelledby': 'dates-btn',
            }}
            anchorEl={datesAnchor}
            open={isMenuOpened}
            onClose={handleDatesClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
              },
            }}
          >
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting) => (
                <MenuItem
                  key={meeting.meetingId}
                  onClick={() => handleCarryOver(meeting.meetingId)}
                >
                  {convertToDate(meeting.plannedAt)}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No upcoming meetings</MenuItem>
            )}
          </Menu>
        </Grid>
        <Grid item>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Item>
  );
}
