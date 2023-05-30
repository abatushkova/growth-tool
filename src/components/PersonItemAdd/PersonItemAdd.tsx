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
import PersonItemWrap from '../PersonItemWrap/PersonItemWrap';

export default function PersonItemAdd() {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('typing');
  const dispatch = useAppDispatch();

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus('error');
      return;
    }

    dispatch(
      addPerson({
        personId: createGuid(),
        personName: name.trim(),
      })
    );
    setIsAdding(false);
    setName('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setName(e.target.value);
  };

  const handleAddOpen = () => setIsAdding(true);
  const handleAddClose = () => {
    setIsAdding(false);
    setStatus('typing');
    setName('');
  };

  return (
    <>
      {isAdding ? (
        <PersonItemWrap
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
