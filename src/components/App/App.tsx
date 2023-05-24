import React, { useState } from 'react';
import {
  useMediaQuery,
  CssBaseline,
  Box
} from '@mui/material';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { theme, drawerWidth } from '../../themes';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isDesktop ? null : (
          <Aside
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <Aside
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { md: 'block', xs: 'none' } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flex: 1 }}>
          <Main />
        </Box>
      </Box>
    </Box>
  );
}
