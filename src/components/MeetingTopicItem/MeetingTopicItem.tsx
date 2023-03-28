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
import EditIcon from '@mui/icons-material/Edit';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { meetings } from '../../store/fakeMeetings';

const ITEM_HEIGHT = 48;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(0.5),
}));

interface ITopicProps {
  title: string;
}

export default function MeetingTopicItem(props: ITopicProps) {
  const { title } = props;
  const [datesAnchor, setDatesAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(datesAnchor);

  const handleDatesOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDatesAnchor(event.currentTarget);
  };

  const handleDatesClose = () => setDatesAnchor(null);

  return (
    <Item>
      <Grid container alignItems="center">
        <Grid item xs>
          {title}
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
            {meetings.map((meeting) => (
              <MenuItem
                key={meeting.meetingId}
                // selected={meeting.meetingId === 2}
                // disabled={meeting.meetingId === 2}
                onClick={handleDatesClose}
              >
                {meeting.createdAt}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Grid item>
          <Tooltip title="Edit">
            <IconButton size="small">
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
    </Item>
  );
}
