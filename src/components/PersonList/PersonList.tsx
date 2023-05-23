import React from 'react';
import {
  List,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonItem from '../PersonItem/PersonItem';
import PersonItemAdd from '../PersonItemAdd/PersonItemAdd';
import { selectPerson, selectPersons, setActivePerson } from '../../features/persons/personsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function PersonList() {
  const selectedPerson = useAppSelector(selectPerson);
  const persons = useAppSelector(selectPersons);
  const dispatch = useAppDispatch();
  const sortedPersons = [...persons].sort((a, b) => (
    (a.personName > b.personName) ? 1 : -1
  ));

  const handlePersonSelect = (id: string, name: string) => {
    if (selectedPerson.personName === name) {
      console.log(selectedPerson.personName, name);
      return;
    }
    dispatch(
      setActivePerson({
        personId: id,
        personName: name
      })
    );
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="persons-search"
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
        <PersonItemAdd />
        {sortedPersons.map((person) => (
          <PersonItem
            key={person.personId}
            {...person}
            selected={selectedPerson.personId}
            onPersonClick={handlePersonSelect}
          />
        ))}
      </List>
    </>
  );
}
