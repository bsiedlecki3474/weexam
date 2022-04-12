import { useState } from 'react'
import EditTestDetails from './EditTestDetails';
import EditTestQuestions from './EditTestQuestions';

import { useLocalStorage } from '../../hooks'

import {
  Tab,
  Tabs,
  Box
} from "@mui/material"


const EditTest = props => {
  const [tab, setTab] = useLocalStorage(0);

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  const tabs = [
    <EditTestDetails />,
    <EditTestQuestions />
  ]

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Details" />
        <Tab label="Questions" />
        <Tab label="Reports" />
      </Tabs>

      {tabs[tab]}
    </Box>
  )
}

export default EditTest;