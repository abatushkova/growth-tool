import React, { useState } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MeetingPage from '../MeetingPage/MeetingPage';
import TopicPage from '../TopicPage/TopicPage';
import EmptyPage from '../EmptyPage/EmptyPage';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import { useAppSelector } from '../../app/hooks';
import { selectGuest } from '../../features/persons/personsSlice';
import { theme, drawerWidth } from '../../themes';
import { selectActiveTopic } from '../../features/topics/topicsSlice';

export default function Main() {
  const guest = useAppSelector(selectGuest);
  const activeTopic = useAppSelector(selectActiveTopic);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {guest.personId ? (
              <>
                {activeTopic.topicId
                  ? <TopicPage />
                  : <MeetingPage />
                }
              </>
            ) : (
              <EmptyPage />
            )}
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
}
