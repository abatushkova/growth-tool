import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
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

interface IHeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: IHeaderProps) {
  const { onDrawerToggle } = props;

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item sx={{ display: { md: 'none', xs: 'block' } }}>
              <IconButton
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton sx={{ p: 0.5 }}>
                <Avatar src="" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Layout pt={3} pb={3}>
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
          <Grid item sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
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
    </>
  );
}
