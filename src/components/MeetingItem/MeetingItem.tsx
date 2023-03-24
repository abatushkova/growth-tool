import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MeetingTopicList from '../MeetingTopicList/MeetingTopicList';

const ITEM_HEIGHT = 48;

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
  const { meetingId, title, createdAt, topics } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState<number | false>(false);
  const [dotsAnchor, setDotsAnchor] = useState<null | HTMLElement>(null);
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs('2022-12-16'));
  const isMenuOpened = Boolean(dotsAnchor);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDotsAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setDotsAnchor(null);

  const handleAccordionToggle =
    (meetingId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setIsExpanded(isExpanded ? meetingId : false);
    };

  const handleEditOpen = () => {
    handleMenuClose();
    setIsEditing(true);
  };

  const handleEditClose = () => setIsEditing(false);

  return (
    <>
      {isEditing ? (
        <Grid container spacing={2} sx={{ mt: 0.5, mb: 3 }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="meeting-title"
              defaultValue={'New Meeting'}
              multiline
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item>
            <DatePicker
              format="LL"
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
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
        <CustomAccordion expanded={isExpanded === meetingId} onChange={handleAccordionToggle(meetingId)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="meeting-header"
            aria-controls="meeting-content"
          >
            <Grid container spacing={1}>
              <Grid item xs={12} container flexWrap="nowrap" spacing={2}>
                {topics.length > 0 && (
                  <Grid item>
                    <Chip label={topics.length} size="small" />
                  </Grid>
                )}
                <Grid item>
                  <Typography variant="h6" component="p">
                    {title}
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <Chip label="passed" size="small" variant="outlined" />
                </Grid> */}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {createdAt}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <MeetingTopicList topics={topics} />
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
                  <MenuItem>
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
