import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';

const headerAvatar = {
  width: {
    md: 52,
    xs: 42,
  },
  height: {
    md: 52,
    xs: 42,
  },
};
const headerName = {
  typography: {
    md: 'h5',
    xs: 'h5',
  },
}

export default function TeamGroup() {
  return (
    <AppBar
      component="div"
      color="primary"
      position="static"
      elevation={0}
      sx={{ zIndex: 0, pt: 2, pb: { md: 5, xs: 2 } }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center" direction={{ md: 'row', xs: 'column' }}>
          <Grid item>
            <AvatarGroup>
              <Avatar src="" alt="Vlad" sx={{ ...headerAvatar }} />
              <Avatar src="" alt="Alon" sx={{ ...headerAvatar }} />
            </AvatarGroup>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Typography sx={{ ...headerName }} component="p">
              Vlad
            </Typography>
            <CodeIcon sx={{ fontSize: 40, mx: 1 }} />
            <Typography sx={{ ...headerName }} component="p">
              Alon
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
