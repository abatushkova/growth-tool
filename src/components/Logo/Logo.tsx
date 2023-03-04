import React from 'react';
import SpaIcon from '@mui/icons-material/Spa';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Logo() {
  return (
    <Grid container spacing={1} alignItems="center" sx={{ p: 2 }}>
      <Grid item>
        <SpaIcon sx={{ fontSize: 24 }} />
      </Grid>
      <Grid item>
        <Typography color="inherit" variant="h6" component="h1" align="left">
          Growth-tool
        </Typography>
      </Grid>
    </Grid>
  );
}
