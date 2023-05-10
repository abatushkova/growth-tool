import React, { useState } from 'react';
import {
  List,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TeamItem from '../TeamItem/TeamItem';
import TeamItemAdd from '../TeamItemAdd/TeamItemAdd';
import { selectPersons } from '../../features/persons/personsSlice';
import { useTypedSelector } from '../../app/hooks';

export default function TeamList() {
  const [selectedMember, setSelectedMember] = useState(-1);
  const members = useTypedSelector(selectPersons);
  const sortedMembers = [...members].sort((a, b) => (
    (a.personName > b.personName) ? 1 : -1
  ));

  const handleMemberSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedMember(index);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="members-search"
            type="search"
            placeholder="Search"
            size="small" fullWidth
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
        <TeamItemAdd />
        {sortedMembers.map((member, index) => (
          <TeamItem
            key={member.personId}
            index={index}
            {...member}
            selected={selectedMember}
            onMemberClick={handleMemberSelect}
          />
        ))}
      </List>
    </>
  );
}
