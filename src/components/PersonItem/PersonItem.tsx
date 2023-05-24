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
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { convertToInitials } from '../../utils/helpers/convertToInitials';
import { useAppDispatch } from '../../app/hooks';
import { deletePerson, editPerson } from '../../features/persons/personsSlice';
import { SelectFunc, PersonId } from '../../app/types';
import PersonItemWrap from '../PersonItemWrap/PersonItemWrap';

const CustomListItem = styled(ListItem)(() => ({
  '&.MuiListItem-secondaryAction': {
    paddingRight: 0,
  },
}));

interface PersonProps {
  personName: string;
  personId: PersonId;
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

    dispatch(
      editPerson({
        personName: name.trim(),
        personId
      })
    );
    setIsEditing(false);
  };

  const handlePersonDelete = () => {
    dispatch(deletePerson(personId));
  };

  return (
    <>
      {isEditing ? (
        <PersonItemWrap
          name={name}
          onFormSubmit={handlePersonSave}
          onInputChange={handlePersonChange}
          onCloseClick={handleEditClose}
          status={status}
        />
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
