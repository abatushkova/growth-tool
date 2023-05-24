import { createTheme } from '@mui/material/styles';

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

export const drawerWidth = 300;

export let theme = createTheme({
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
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-h2': {
            marginBlock: 40,
            fontSize: 30,
            fontWeight: 500,
            [theme.breakpoints.up('md')]: {
              fontSize: 36,
            },
          },
        },
      },
    },
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
