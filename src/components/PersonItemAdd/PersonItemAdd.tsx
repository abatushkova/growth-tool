import React, { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { addPerson } from '../../features/persons/personsSlice';
import { createGuid } from '../../utils/helpers/createGuid';
import { useAppDispatch } from '../../app/hooks';

export default function PersonItemAdd() {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(
      addPerson({
        personId: createGuid(),
        personName: name.trim(),
      })
    );
    setIsAdding(false);
    setName('');
  }

  const handleAddOpen = () => {
    setIsAdding(true);
  };
  const handleAddClose = () => {
    setIsAdding(false);
    setName('');
  };

  return (
    <>
      {isAdding ? (
        <Stack
          direction="row" alignItems="center"
          spacing={0.5} sx={{ pt: 0.75, pr: 1.5, pb: 1, pl: 2 }}
          component="form" noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            id="member-add"
            variant="standard"
            placeholder="Type a Name"
            size="small" fullWidth
            InputProps={{
              style: { fontSize: 14 }
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <IconButton
            aria-label="Add"
            size="small"
            type="submit"
          >
            <SaveIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="Cancel"
            size="small"
            onClick={handleAddClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Stack>
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
