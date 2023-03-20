import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Aside from '../Aside/Aside';
import Content from '../Content/Content';
import Header from '../Header/Header';

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    gray: Palette['primary'];
  }
  interface PaletteOptions {
    white: PaletteOptions['primary'];
    gray: PaletteOptions['primary'];
  }
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
      contrastText: '#fff',
    },
    gray: {
      main: '#f4f5f7',
      dark: '#aaabac',
    },
    white: {
      main: '#fff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    h2: {
      fontSize: 36,
      fontWeight: 500,
      marginBlock: '2.5rem',
    },
    h3: {
      fontSize: 24,
      fontWeight: 500,
    },
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: theme.palette.gray.dark,
          },
          '& .MuiInputBase-multiline': {
            backgroundColor: theme.palette.white.main,
          }
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 0,
          padding: 0,
          '&.Mui-selected': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected, &.Mui-selected:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'rgba(0,155,229,0.12)',
          },
          '&:hover': {
            backgroundColor: 'rgba(51,51,51,0.06)',
          }
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 300;

export default function Base() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {isSmUp ? null : (
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
            <Content />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
