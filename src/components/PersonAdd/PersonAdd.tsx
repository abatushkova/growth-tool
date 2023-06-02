import React, { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { addPerson } from '../../features/persons/personsSlice';
import { createGuid } from '../../utils/helpers/createGuid';
import { useAppDispatch } from '../../app/hooks';
import PersonForm from '../PersonForm/PersonForm';

export default function PersonAdd() {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('typing');
  const dispatch = useAppDispatch();

  const handleAddOpen = () => setIsAdding(true);
  const handleAddClose = () => {
    setIsAdding(false);
    setStatus('typing');
    setName('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setName(e.target.value);
  };

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validName = name.trim();

    if (!validName) {
      setStatus('error');
      return;
    }

    dispatch(
      addPerson({
        personId: createGuid(),
        personName: validName,
      })
    );
    handleAddClose();
  };

  return (
    <>
      {isAdding ? (
        <PersonForm
          name={name}
          onFormSubmit={handleSubmit}
          onInputChange={handleChange}
          onCloseClick={handleAddClose}
          status={status}
        />
      ) : (
        <ListItem disablePadding>
          <ListItemButton onClick={handleAddOpen}>
            <ListItemAvatar>
              <Avatar>
                <PersonAddIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Add member</ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
}
