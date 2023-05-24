import React from 'react';
import {
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface WrapProps {
  name: string;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseClick: () => void;
  status: string;
}

export default function PersonItemWrap(props: WrapProps) {
  const {
    name,
    onInputChange,
    onFormSubmit,
    onCloseClick,
    status
  } = props;

  return (
    <Stack
      direction="row" spacing={1}
      alignItems="flex-start"
      sx={{ pt: 1.2, pr: 1.5, pb: 1.2, pl: 2 }}
      component="form" noValidate
      onSubmit={onFormSubmit}
    >
      <TextField
        error={status === 'error' ?? 'true'}
        helperText={status === 'error' ? 'Name cannot be empty' : null}
        variant="outlined"
        placeholder="Enter Name"
        size="small" fullWidth
        InputProps={{
          style: { fontSize: 14 }
        }}
        value={name}
        onChange={onInputChange}
        autoFocus
      />
      <IconButton
        aria-label="Save"
        size="small"
        type="submit"
      >
        <SaveIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="Cancel"
        size="small"
        onClick={onCloseClick}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}
