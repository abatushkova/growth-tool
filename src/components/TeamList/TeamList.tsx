import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { members } from '../../store/fakeMembers';
import { convertToInitials } from '../../utils/helpers/convertToInitials';

export default function TeamList() {
  const [selectedMember, setSelectedMember] = useState(-1);

  const handleMemberSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedMember(index);
  };

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
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMember === 0}
            onClick={(event) => handleMemberSelect(event, 0)}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonAddIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Add Member</ListItemText>
          </ListItemButton>
        </ListItem>
        {/* sorted list A-Z */}
        {members.map(({ personId, personName }) => (
          <ListItem disablePadding key={personId}>
            <ListItemButton
              selected={selectedMember === personId}
              onClick={(event) => handleMemberSelect(event, personId)}
            >
              <ListItemAvatar>
                <Avatar {...convertToInitials(personName)} />
              </ListItemAvatar>
              <ListItemText>{personName}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
