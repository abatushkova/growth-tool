import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import Layout from '../Layout/Layout';

const headerAvatar = {
  width: {
    md: 54,
    xs: 44,
  },
  height: {
    md: 54,
    xs: 44,
  },
};

export default function TeamGroup() {
  return (
    <Layout pt={2} pb={4}>
      <Grid
        container
        spacing={{ md: 2, xs: 1}}
        alignItems="center"
        direction={{ md: 'row', xs: 'column' }}
      >
        <Grid item>
          <AvatarGroup>
            <Avatar src="" alt="Vlad" sx={{ ...headerAvatar }} />
            <Avatar src="" alt="Alon" sx={{ ...headerAvatar }} />
          </AvatarGroup>
        </Grid>
        <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h5" component="p">
            Vlad
          </Typography>
          <CodeIcon sx={{ fontSize: 32, mx: 1 }} />
          <Typography variant="h5" component="p">
            Alon
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
