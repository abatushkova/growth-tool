import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Toolbar,
  Avatar,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';

interface IHeaderProps {
  onDrawerToggle: () => void;
}

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  color: theme.palette.primary.dark,
}));

export default function Header(props: IHeaderProps) {
  const { onDrawerToggle } = props;
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(avatarAnchor);

  const handleAvatarOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarAnchor(event.currentTarget);
  };

  const handleAvatarClose = () => setAvatarAnchor(null);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid item sx={{ display: { md: 'none', xs: 'block' } }}>
            <IconButton
              color="inherit"
              aria-label="Open navbar"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />
          <Grid item>
            <IconButton
              aria-label="Avatar"
              id="avatar-btn"
              aria-controls={isMenuOpened ? 'avatar-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpened ? 'true' : undefined}
              onClick={handleAvatarOpen}
              sx={{ p: 0.5 }}
            >
              <CustomAvatar />
            </IconButton>
            <Menu
              id="avatar-menu"
              anchorEl={avatarAnchor}
              open={isMenuOpened}
              onClose={handleAvatarClose}
              MenuListProps={{
                'aria-labelledby': 'avatar-btn',
              }}
            >
              <MenuItem onClick={handleAvatarClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
