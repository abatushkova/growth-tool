import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Base from '../Base/Base';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Base />
    </LocalizationProvider>
  );
}
