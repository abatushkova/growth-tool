import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import TeamItem from '../TeamItem/TeamItem';
import { members } from '../../store/fakeMembers';

export default function TeamList() {
  const [selectedMember, setSelectedMember] = useState(-1);
  const [isAdding, setIsAdding] = useState(false);

  const handleMemberSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedMember(index);
  };

  const handleAddOpen = () => setIsAdding(true);
  const handleAddClose = () => setIsAdding(false);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="members-search"
            type="search"
            placeholder="Search"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { fontSize: 14 }
            }}
          />
        </Box>
      </Box>
      <List disablePadding sx={{
        position: 'absolute',
        top: '70px', // search field height
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
      }}>
        {isAdding ? (
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ pt: 0.75, pr: 1.5, pb: 1, pl: 2 }}>
            <TextField
              id="member-add"
              variant="standard"
              placeholder="Name"
              size="small"
              fullWidth
              InputProps={{
                style: { fontSize: 14 }
              }}
            />
            <IconButton aria-label="Add" size="small">
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
        {/* sorted list A-Z */}
        {members.map((member) => (
          <TeamItem
            key={member.personId}
            {...member}
            selected={selectedMember}
            onMemberClick={handleMemberSelect}
          />
        ))}
      </List>
    </>
  );
}
