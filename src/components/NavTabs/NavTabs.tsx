import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import TabPanel from '../NavTabPanel/NavTabPanel';
import PersonList from '../PersonList/PersonList';
import { TabTypes } from '../../utils/constants/colors';

const tabColors = Object.values(TabTypes);

function a11yProps(index: number) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const [tabIdx, setTabIdx] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabIdx(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: tabColors[tabIdx],
      }}>
        <TabPanel value={tabIdx} index={0}>
          <PersonList />
        </TabPanel>
        <TabPanel value={tabIdx} index={1}>
        </TabPanel>
        <TabPanel value={tabIdx} index={2}>
        </TabPanel>
      </Box>
      <Tabs
        value={tabIdx}
        onChange={handleTabChange}
        aria-label="Navigation tabs"
        variant="fullWidth"
        centered
      >
        <Tab label="Meetings" {...a11yProps(0)} sx={{ bgcolor: TabTypes.Meetings }} />
        <Tab label="Catalog" {...a11yProps(1)} sx={{ bgcolor: TabTypes.Catalog }} />
        <Tab label="Reports" {...a11yProps(2)} sx={{ bgcolor: TabTypes.Reports }} />
      </Tabs>
    </Box>
  );
}
