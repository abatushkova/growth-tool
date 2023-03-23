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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [targetEl, setTargetEl] = useState('');
  const open = Boolean(anchorEl);

  const handleMenuOpen = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTargetEl(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Item>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          {title}
        </Grid>
        <Grid item>
          <Tooltip title="Carry-over">
            <IconButton
              size="small"
              id="long-button"
              aria-controls={open ? 'topicMenu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleMenuOpen('topicMenu')}
            >
              <AddLinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            hidden={targetEl !== 'topicMenu'}
            onClose={handleMenuClose}
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
                onClick={handleMenuClose}
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
