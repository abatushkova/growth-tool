import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TabPanel from '../NavTabPanel/NavTabPanel';
import TeamList from '../TeamList/TeamList';
import { categories } from '../../utils/constants/colors';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: categories[value],
      }}>
        <TabPanel value={value} index={0}>
          <TeamList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography></Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography></Typography>
        </TabPanel>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs"
        variant="fullWidth"
        centered
      >
        <Tab label="Meetings" {...a11yProps(0)} sx={{ bgcolor: categories[0] }} />
        <Tab label="Catalog" {...a11yProps(1)} sx={{ bgcolor: categories[1] }} />
        <Tab label="Reports" {...a11yProps(2)} sx={{ bgcolor: categories[2] }} />
      </Tabs>
    </Box>
  );
}
