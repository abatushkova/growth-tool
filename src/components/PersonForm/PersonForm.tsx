import React from 'react';
import {
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface FormProps {
  name: string;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseClick: () => void;
  status: string;
}

export default function PersonForm(props: FormProps) {
  const {
    name,
    onInputChange,
    onFormSubmit,
    onCloseClick,
    status
  } = props;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{ pt: 0.75, px: 2, minHeight: 48 }}
      component="form"
      noValidate
      onSubmit={onFormSubmit}
    >
      <TextField
        error={status === 'error' && true}
        helperText={status === 'error' ? 'Please fill out this field' : null}
        variant="outlined"
        placeholder="Name"
        fullWidth
        size="small"
        InputProps={{
          style: { fontSize: 14 }
        }}
        value={name}
        onChange={onInputChange}
        autoFocus
      />
      <IconButton aria-label="Save" size="small" type="submit">
        <SaveIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Cancel" size="small" onClick={onCloseClick}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
