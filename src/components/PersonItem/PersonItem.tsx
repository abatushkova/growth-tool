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
import PersonFrom from '../PersonForm/PersonForm';
import { convertToInitials } from '../../utils/helpers/convertToInitials';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SelectFunc, PersonId } from '../../app/types';
import { deletePerson, editPerson, setGuest } from '../../features/persons/personsSlice';
import { filterMeetings, selectMeetingList } from '../../features/meetings/meetingsSlice';
import { closeActiveTopic, filterTopics } from '../../features/topics/topicsSlice';
import { convertToCapital } from '../../utils/helpers/convertToCapital';

interface PersonProps {
  personName: string;
  personId: PersonId;
  selected: string;
  onPersonClick: SelectFunc;
}

export default function PersonItem(props: PersonProps) {
  const { personName, personId, selected, onPersonClick } = props;

  const dispatch = useAppDispatch();
  const meetings = useAppSelector(selectMeetingList);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(personName);
  const [status, setStatus] = useState('typing');

  const handleEditOpen = () => setIsEditing(true);
  const handleEditClose = () => {
    setIsEditing(false);
    setStatus('typing');
    setName(personName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validName = name.trim();
    if (!validName) {
      setStatus('error');
      return;
    }
    validName = convertToCapital(validName);

    dispatch(
      editPerson({
        personId,
        personName: validName
      })
    );
    if (selected === personId) {
      dispatch(
        setGuest({
          personId,
          personName: validName
        })
      );
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(closeActiveTopic());
    [...meetings]
      .filter(({ guests }) => guests[0].guestId === personId)
      .forEach(({ meetingId }) => dispatch(filterTopics(meetingId)));
    dispatch(filterMeetings(personId));
    dispatch(deletePerson(personId));
  };

  return (
    <>
      {isEditing ? (
        <PersonFrom
          name={name}
          onFormSubmit={handleSubmit}
          onInputChange={handleChange}
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
            <IconButton aria-label="Edit" onClick={handleEditOpen} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Delete" onClick={handleDelete} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </>
  );
}
