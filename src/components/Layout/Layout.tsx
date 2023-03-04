import React from 'react';
import Box from '@mui/material/Box';

interface ILayoutProps {
  children?: React.ReactNode;
  pt?: number;
  pb?: number;
}

export default function Layout(props: ILayoutProps) {
  const { children, pt, pb } = props;

  return (
    <Box sx={{ width: '100%', maxWidth: 960, m: 'auto', px: 2 }} pt={pt} pb={pb}>
      {children}
    </Box>
  );
}
