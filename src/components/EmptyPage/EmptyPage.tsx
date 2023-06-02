import React from 'react';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import Layout from '../Layout/Layout';
import { convertToDate } from '../../utils/helpers/convertToDate';

export default function EmptyPage() {
  return (
    <Layout>
      <Typography variant="h3" align="center">
        {convertToDate(dayjs().toString())}
      </Typography>
    </Layout>
  )
}
