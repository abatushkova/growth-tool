import React from 'react';
import { Container } from '@mui/material';

interface LayoutProps {
  children?: React.ReactNode;
  pt?: number;
  pb?: number;
}

export default function Layout(props: LayoutProps) {
  const { children, pt = 5, pb = 6 } = props;

  return (
    <Container maxWidth="md" sx={{ pt, pb }}>
      {children}
    </Container>
  );
}
