import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MeetingPage from '../MeetingPage/MeetingPage';
import TopicPage from '../TopicPage/TopicPage';

export default function Main() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MeetingPage />
      <TopicPage />
    </LocalizationProvider>
  );
}
