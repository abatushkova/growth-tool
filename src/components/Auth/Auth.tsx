import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/auth/authSlice';
import { createGuid } from '../../utils/helpers/createGuid';

const userId = createGuid();

export default function Auth() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('typing');
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validName = name.trim();

    if (!validName) {
      setStatus('error');
      return;
    };

    dispatch(
      login({
        personId: userId,
        personName: validName,
      })
    );
    setName('');
  };

  return (
    <Box sx={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.gray.dark
    }}>
      <Container maxWidth="sm">
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ color: 'white.main' }}>
          <SpaIcon sx={{ fontSize: {xs: 32, md: 40} }} />
          <Typography variant="h2" component="h1">
            Growth-tool
          </Typography>
        </Stack>
        <Paper sx={{ py: 5, px: 3 }}>
          <Typography variant="h6" mb={5} textAlign="center">
            Login to your account
          </Typography>
          <Grid
            component="form"
            noValidate
            autoComplete="off"
            container
            direction="column"
            spacing={3}
            onSubmit={handleSubmit}
          >
            <Grid item>
              <TextField
                error={status === 'error' && true}
                helperText={status === 'error' ? 'Please enter your Name' : null}
                label="Username"
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" size="large" fullWidth>
                Continue
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
