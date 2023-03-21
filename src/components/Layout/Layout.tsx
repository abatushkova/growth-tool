import React from 'react';
import { Container } from '@mui/material';

interface ILayoutProps {
  children?: React.ReactNode;
  pt?: number;
  pb?: number;
}

export default function Layout(props: ILayoutProps) {
  const { children, pt, pb = 6 } = props;

  return (
    <Container maxWidth="md" sx={{ pt, pb }}>
      {children}
    </Container>
  );
}
