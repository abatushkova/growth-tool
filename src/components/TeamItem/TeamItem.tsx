import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { convertToInitials } from '../../utils/helpers/convertToInitials';

const CustomListItem = styled(ListItem)(({ theme }) => ({
  '&.MuiListItem-secondaryAction': {
    paddingRight: 0,
  },
  '&.MuiListItem-root + .hidden-menu': {
    // display: 'none',
  },
  '&.MuiListItem-root:hover + .hidden-menu': {
    // display: 'block',
  },
}));

interface IMemberProps {
  personName: string;
  selected: number;
  index: number;
  onMemberClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, S: number) => void;
}

export default function TeamItem(props: IMemberProps) {
  const { index, personName, selected, onMemberClick } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(personName);
  const [dotsAnchor, setDotsAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(dotsAnchor);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setDotsAnchor(e.currentTarget);
  };

  const handleEditOpen = () => {
    handleMenuClose();
    setIsEditing(true);
  };

  const handleMenuClose = () => setDotsAnchor(null);
  const handleEditClose = () => setIsEditing(false);

  return (
    <>
      {isEditing ? (
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ pt: 0.75, pr: 1.5, pb: 1, pl: 2 }}>
          <TextField
            id="member-add"
            variant="standard"
            value={name}
            placeholder="Name"
            size="small"
            fullWidth
            InputProps={{
              style: { fontSize: 14 }
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton aria-label="Add" size="small">
            <SaveIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="Cancel"
            size="small"
            onClick={handleEditClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ) : (
        <CustomListItem disablePadding>
          <ListItemButton
            selected={selected === index}
            onClick={(e) => onMemberClick(e, index)}
          >
            <ListItemAvatar>
              <Avatar {...convertToInitials(personName)} />
            </ListItemAvatar>
            <ListItemText>{personName}</ListItemText>
          </ListItemButton>
          <ListItemSecondaryAction className="hidden-menu">
            <IconButton
              edge="end"
              aria-label="Meeting menu"
              size="small"
              id="meeting-dots"
              aria-controls={isMenuOpened ? 'meeting-menu' : undefined}
              aria-expanded={isMenuOpened ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreHorizIcon fontSize="inherit" />
            </IconButton>
            <Menu
              id="meeting-menu"
              MenuListProps={{
                'aria-labelledby': 'meeting-dots',
              }}
              anchorEl={dotsAnchor}
              open={isMenuOpened}
              onClose={handleMenuClose}
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
          </ListItemSecondaryAction>
        </CustomListItem>
      )}
    </>
  );
}
