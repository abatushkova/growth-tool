import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../Layout/Layout';

export default function EmptyPage() {
  return (
    <Layout>
      <Typography variant="h3">
        Select guest to create a meeting.
      </Typography>
    </Layout>
  )
}
