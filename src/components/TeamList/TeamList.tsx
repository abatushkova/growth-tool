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

export default function TeamList() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
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
            id="outlined-search"
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
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
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
        {members.map(({ id, color, name }) => (
          <ListItem disablePadding key={id}>
            <ListItemButton
              selected={selectedIndex === id}
              onClick={(event) => handleListItemClick(event, id)}
            >
              <ListItemAvatar>
                {/* remove bgcolor */}
                <Avatar src="" sx={{ bgcolor: color }} alt={name} />
              </ListItemAvatar>
              <ListItemText>{name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
