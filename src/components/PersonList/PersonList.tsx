import React, { useState, useEffect, useMemo } from 'react';
import {
  List,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonItem from '../PersonItem/PersonItem';
import PersonAdd from '../PersonAdd/PersonAdd';
import { selectGuest, selectPersonList, setGuest } from '../../features/persons/personsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Person } from '../../app/types';
import { closeActiveTopic } from '../../features/topics/topicsSlice';

export default function PersonList() {
  const dispatch = useAppDispatch();
  const guest = useAppSelector(selectGuest);
  const persons = useAppSelector(selectPersonList);
  const list = useMemo(() => (
    [...persons].sort((a, b) => ((a.personName > b.personName) ? 1 : -1))
  ), [persons]);
  const [sortedPersons, setSortedPersons] = useState<Person[]>(list);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePersonSelect = (id: string, name: string) => {
    if (guest.personId === id) return;

    dispatch(
      setGuest({
        personId: id,
        personName: name
      })
    );
    dispatch(closeActiveTopic());
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
            fullWidth
            size="small"
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
        <PersonAdd />
        {sortedPersons.map((person) => (
          <PersonItem
            key={person.personId}
            {...person}
            selected={guest.personId}
            onPersonClick={handlePersonSelect}
          />
        ))}
      </List>
    </>
  );
}
