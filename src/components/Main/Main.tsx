import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MeetingPage from '../MeetingPage/MeetingPage';
import TopicPage from '../TopicPage/TopicPage';
import EmptyPage from '../EmptyPage/EmptyPage';
import { useAppSelector } from '../../app/hooks';
import { selectPerson } from '../../features/persons/personsSlice';

export default function Main() {
  const selectedPerson = useAppSelector(selectPerson);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {selectedPerson.personId ? (
        <>
          <MeetingPage />
          <TopicPage />
        </>
      ) : (
        <EmptyPage />
      )}
    </LocalizationProvider>
  );
}
