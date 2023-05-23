import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import TabPanel from '../NavTabPanel/NavTabPanel';
import PersonList from '../PersonList/PersonList';
import { categories } from '../../utils/constants/colors';

function a11yProps(index: number) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const [tabName, setTabName] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabName(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: categories[tabName],
      }}>
        <TabPanel value={tabName} index={0}>
          <PersonList />
        </TabPanel>
        <TabPanel value={tabName} index={1}>
        </TabPanel>
        <TabPanel value={tabName} index={2}>
        </TabPanel>
      </Box>
      <Tabs
        value={tabName}
        onChange={handleTabChange}
        aria-label="Navigation tabs"
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
