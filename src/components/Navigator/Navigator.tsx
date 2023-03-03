import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import SpaIcon from '@mui/icons-material/Spa';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tabs from '../Tabs/Tabs';

const navItem = {
  p: 2,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <Grid container spacing={1} alignItems="center" sx={{ ...navItem }}>
        <Grid item>
          <SpaIcon sx={{ fontSize: 24 }} />
        </Grid>
        <Grid item>
          <Typography color="inherit" variant="h6" component="h1" align="left">
            Growth-tool
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ ...navItem }}>
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
      <Tabs />
    </Drawer>
  );
}
