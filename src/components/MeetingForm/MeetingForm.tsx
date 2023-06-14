import React from 'react';
import { SxProps } from '@mui/system';
import {
  Grid,
  Button,
  TextField,
} from '@mui/material';

interface FormProps {
  children?: React.ReactNode;
  title: string;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseClick: () => void;
  status: string;
  buttonName: string;
  sx: SxProps;
}

export default function MeetingForm(props: FormProps) {
  const {
    children,
    title,
    onFormSubmit,
    onInputChange,
    onCloseClick,
    status,
    buttonName,
    sx
  } = props;

  return (
    <Grid
      container
      spacing={2}
      component="form"
      noValidate
      onSubmit={onFormSubmit}
      sx={sx}
    >
      <Grid item xs={12}>
        <TextField
          error={status === 'error' && true}
          helperText={status === 'error' ? 'Please fill out this field' : null}
          variant="outlined"
          label="Title"
          fullWidth
          size="small"
          value={title}
          onChange={onInputChange}
        />
      </Grid>
      <Grid item>
        {children}
      </Grid>
      <Grid item container spacing={1}>
        <Grid item>
          <Button variant="contained" type="submit">
            {buttonName}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" onClick={onCloseClick}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
