import EditTestDetails from './EditTestDetails';
import EditTestQuestions from './EditTestQuestions';
import { withStyles } from '@mui/styles';
import { useLocalStorage } from '../../hooks'

import {
  Tab,
  Tabs,
  Box
} from "@mui/material"

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    height: `calc(100vh - ${theme.spacing(14)})`
  },
})

const EditTest = ({ classes }) => {
  const [tab, setTab] = useLocalStorage('activeTestTab', 0);

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  const tabs = [
    <EditTestDetails />,
    <EditTestQuestions />
  ]

  return (
    <Box className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Details" />
        <Tab label="Questions" />
        <Tab label="Reports" />
      </Tabs>
      {tabs[tab]}
    </Box>
  )
}

export default withStyles(styles)(EditTest);