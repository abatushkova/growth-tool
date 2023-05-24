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
import { selectPerson } from '../../features/persons/personsSlice';
import { useAppSelector } from '../../app/hooks';

const meetingAvatar = {
  width: {
    md: 54,
    xs: 44,
  },
  height: {
    md: 54,
    xs: 44,
  },
  fontSize: '1.5rem',
};

const author = 'Vlad';

export default function MeetingMembers() {
  const { personName } = useAppSelector(selectPerson);

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
            <Avatar {...convertToInitials(author, meetingAvatar)} />
            {personName ? (
              <Avatar {...convertToInitials(personName, meetingAvatar)} />
            ) : null}
          </AvatarGroup>
        </Grid>
        <Grid item sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Typography variant="h3" component="p">
            {author}
          </Typography>
          {personName ? (
            <>
              <CodeIcon sx={{ fontSize: 32, mx: 1 }} />
              <Typography variant="h3" component="p">
                {personName}
              </Typography>
            </>
          ): null}
        </Grid>
      </Grid>
    </Layout>
  );
}
