import { withStyles } from '@mui/styles';
import withNavigation from "../../hoc/withNavigation";
import withParams from "../../hoc/withParams";
import { ViewLayout } from '../../layouts';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Box,
  IconButton,
} from "@mui/material"

import {
  EventReportTiles,
  EventReportList
} from './';

const styles = theme => ({
  root: {
    height: '100%'
  },
})

const EventReport = props => {
  const { classes, params, navigate } = props;
  const { testId } = params;

  return (
    <Box className={classes.root}>
      <ViewLayout
        title={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton edge="end" size="small" onClick={e => navigate(`/tests/${testId}`)}>
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            Test report
          </Box>
        }
      >
        <EventReportTiles />
        <EventReportList />
      </ViewLayout>
    </Box>
    
  )
}

export default withParams(withNavigation(withStyles(styles)(EventReport)));
