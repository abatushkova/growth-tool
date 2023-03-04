import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Logo from '../Logo/Logo';
import Navigator from '../Navigator/Navigator';

export default function Aside(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <Logo />
      <Divider />
      <Navigator />
    </Drawer>
  );
}
