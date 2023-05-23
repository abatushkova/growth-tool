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
import { useAppDispatch } from '../../app/hooks';
import { deletePerson, editPerson } from '../../features/persons/personsSlice';
import { SelectFunc } from '../../app/types';

const CustomListItem = styled(ListItem)(() => ({
  '&.MuiListItem-secondaryAction': {
    paddingRight: 0,
  },
}));

interface PersonProps {
  personName: string;
  personId: string;
  selected: string;
  onPersonClick: SelectFunc;
}

export default function PersonItem(props: PersonProps) {
  const { personName, personId, selected, onPersonClick } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(personName);
  const [status, setStatus] = useState('typing');
  const [dotsAnchor, setDotsAnchor] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const isMenuOpened = Boolean(dotsAnchor);
  
  const handleMenuClose = () => setDotsAnchor(null);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setDotsAnchor(e.currentTarget);
  };

  const handleEditClose = () => {
    setIsEditing(false);
    setStatus('typing');
    setName(personName);
  };
  const handleEditOpen = () => {
    handleMenuClose();
    setIsEditing(true);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setName(e.target.value);
  }

  const handlePersonSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus('error');
      return;
    }

    setIsEditing(false);
    dispatch(
      editPerson({
        personName: name,
        personId
      })
    );
  };

  const handlePersonDelete = () => {
    dispatch(deletePerson(personId));
  };

  return (
    <>
      {isEditing ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ pt: 0.75, pr: 1.5, pb: 1, pl: 2 }}
          component="form" noValidate
          onSubmit={handlePersonSave}
        >
          <TextField
            error={status === 'error' ?? 'true'}
            helperText={status === 'error' ? 'Name cannot be empty' : null}
            id="member-add"
            variant="standard"
            value={name}
            placeholder="Name"
            size="small"
            fullWidth
            InputProps={{
              style: { fontSize: 14 }
            }}
            onChange={handlePersonChange}
          />
          <IconButton
            aria-label="Add"
            size="small"
            type="submit"
            // onClick={handlePersonSave}
          >
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
            selected={selected === personId}
            onClick={() => onPersonClick(personId, personName)}
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
              <MenuItem onClick={handlePersonDelete}>
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
