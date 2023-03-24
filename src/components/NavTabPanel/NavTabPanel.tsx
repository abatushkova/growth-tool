import React from 'react';
import { Box } from '@mui/material';

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function NavTabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
