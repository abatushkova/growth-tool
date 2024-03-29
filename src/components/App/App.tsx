import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Main from '../Main/Main';
import Auth from '../Auth/Auth';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/authSlice';

export default function App() {
  const user = useAppSelector(selectUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user.personId) {
      setIsLoggedIn(true);
      return;
    }

    setIsLoggedIn(false);
  }, [user.personId]);

  return (
    <Box sx={{ flex: 1, display: 'flex' }}>
      {isLoggedIn
        ? <Main />
        : <Auth />
      }
    </Box>
  );
}
