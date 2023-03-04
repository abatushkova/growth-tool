import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import NavTabs from '../NavTabs/NavTabs';

export default function Navigator() {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          component="form"
          sx={{ width: '100%' }}
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
      <NavTabs />
    </>
  );
}
