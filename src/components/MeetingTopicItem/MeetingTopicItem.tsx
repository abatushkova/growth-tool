import React, { useState } from 'react';
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
import { MeetingId, Topic } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTopic } from '../../features/topics/topicsSlice';
import { selectMeetingList } from '../../features/meetings/meetingsSlice';
import { convertToDate } from '../../utils/helpers/convertToDate';
import { selectActivePerson } from '../../features/persons/personsSlice';

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
  const { personId } = useAppSelector(selectActivePerson);
  const meetings = useAppSelector(selectMeetingList);
  const activeMeetings = [...meetings].filter(({ closed, meetingId, guests }) => (
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
    dispatch(deleteTopic(topicId));
  };

  return (
    <Item>
      <Grid container alignItems="center">
        <Grid item xs>
          {title}
        </Grid>
        <Grid item>
          <Tooltip title="Comment">
            <IconButton size="small">
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
            {activeMeetings.length > 0 ? (
              activeMeetings.map((meeting) => (
                <MenuItem
                  key={meeting.meetingId}
                  onClick={handleDatesClose}
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
