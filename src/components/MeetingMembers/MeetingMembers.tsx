import React from 'react';
import {
  Typography,
  Grid,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import Layout from '../Layout/Layout';
import { convertToInitials } from '../../utils/helpers/convertToInitials';

const meetingAvatar = {
  width: {
    md: 54,
    xs: 44,
  },
  height: {
    md: 54,
    xs: 44,
  },
};

export default function MeetingMembers() {
  return (
    <Layout pt={3} pb={3}>
      <Grid
        container
        spacing={{ md: 2, xs: 1}}
        alignItems="center"
        direction={{ md: 'row', xs: 'column' }}
      >
        <Grid item>
          <AvatarGroup>
            <Avatar {...convertToInitials('Vlad', meetingAvatar)} />
            <Avatar {...convertToInitials('Alon', meetingAvatar)} />
          </AvatarGroup>
        </Grid>
        <Grid item sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Typography variant="h3" component="p">
            Vlad
          </Typography>
          <CodeIcon sx={{ fontSize: 32, mx: 1 }} />
          <Typography variant="h3" component="p">
            Alon
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
