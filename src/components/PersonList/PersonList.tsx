import React, { useState, useEffect, useMemo } from 'react';
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
import { Person } from '../../app/types';

export default function PersonList() {
  const dispatch = useAppDispatch();
  const selectedPerson = useAppSelector(selectPerson);
  const persons = useAppSelector(selectPersons);
  const list = useMemo(() => (
    [...persons].sort((a, b) => ((a.personName > b.personName) ? 1 : -1))
  ), [persons]);
  const [sortedPersons, setSortedPersons] = useState<Person[]>(list);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePersonSelect = (id: string, name: string) => {
    if (selectedPerson.personId === id) return;

    dispatch(
      setActivePerson({
        personId: id,
        personName: name
      })
    );
  };

  const handlePersonSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredPersons = [...list].filter((person) => (
      person.personName.toLowerCase().includes(query.toLowerCase())
    ));
    setSortedPersons(filteredPersons);
  };

  useEffect(() => {
    setSearchQuery('');
    setSortedPersons(list);
  }, [list]);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            value={searchQuery}
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
            onChange={handlePersonSearch}
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