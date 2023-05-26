import React, { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { convertToInitials } from '../../utils/helpers/convertToInitials';
import { useAppDispatch } from '../../app/hooks';
import { deletePerson, editPerson, setActivePerson } from '../../features/persons/personsSlice';
import { SelectFunc, PersonId } from '../../app/types';
import PersonItemWrap from '../PersonItemWrap/PersonItemWrap';

interface PersonProps {
  personName: string;
  personId: PersonId;
  selected: string;
  onPersonClick: SelectFunc;
}

export default function PersonItem(props: PersonProps) {
  const { personName, personId, selected, onPersonClick } = props;
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(personName);
  const [status, setStatus] = useState('typing');

  const handleEditOpen = () => setIsEditing(true);
  const handleEditClose = () => {
    setIsEditing(false);
    setStatus('typing');
    setName(personName);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setName(e.target.value);
  }

  const handlePersonSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validName = name.trim();

    if (!validName) {
      setStatus('error');
      return;
    }

    dispatch(
      editPerson({
        personId,
        personName: validName
      })
    );
    if (selected === personId) {
      dispatch(
        setActivePerson({
          personId,
          personName: validName
        })
      );
    }
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
        <ListItem disablePadding>
          <ListItemButton
            selected={selected === personId}
            onClick={() => onPersonClick(personId, personName)}
          >
            <ListItemAvatar>
              <Avatar {...convertToInitials(personName)} />
            </ListItemAvatar>
            <ListItemText>{personName}</ListItemText>
          </ListItemButton>
          <ListItemSecondaryAction>
            <IconButton onClick={handleEditOpen} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handlePersonDelete} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </>
  );
}