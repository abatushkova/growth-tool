import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MeetingPage from '../MeetingPage/MeetingPage';
import TopicPage from '../TopicPage/TopicPage';
import EmptyPage from '../EmptyPage/EmptyPage';
import { useAppSelector } from '../../app/hooks';
import { selectActivePerson } from '../../features/persons/personsSlice';

export default function Main() {
  const { personId } = useAppSelector(selectActivePerson);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {personId ? (
        <>
          <MeetingPage />
          {/* <TopicPage /> */}
        </>
      ) : (
        <EmptyPage />
      )}
    </LocalizationProvider>
  );
}
