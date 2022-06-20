
import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withNavigation from "../../hoc/withNavigation";
import withParams from "../../hoc/withParams";
import { ViewLayout } from '../../layouts';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Paper,
  Box,
  Typography,
  Grid,
  IconButton,
  List,
  Autocomplete,
  TextField as MdlTextField
} from "@mui/material"

import { handleGetEventReport } from '../../redux/actions/events';
import { getEventReport } from '../../api/events';

const styles = theme => ({
  root: {
    height: '100%'
  },
})

const EventReport = props => {
  const [report, setReport] = useState(null)
  const { classes, params, navigate } = props;
  const { testId, eventId } = params;

  useEffect(() => {
    getEventReport(eventId).then(res => setReport(res));
  }, [eventId])

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
        {report && <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography>Total users</Typography>
              <Typography color="text.secondary">{report.totalUsers}</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography>Completion rate</Typography>
              <Typography color="text.secondary">{report.participants ? ((report.participants / (report.totalUsers || 1)) * 100).toFixed(2): window.DASH}%</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography>Max test score</Typography>
              <Typography color="text.secondary">{report.totalTestScore ?? window.DASH}</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography>Max score</Typography>
              <Typography color="text.secondary">{report.maxScore ?? window.DASH}</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography>Avg score</Typography>
              <Typography color="text.secondary">{report.averageScore ?? window.DASH}</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography>Avg %</Typography>
              <Typography color="text.secondary">{report.averageScore ? ((report.averageScore / (report.totalTestScore || 1)) * 100).toFixed(2) : window.DASH}%</Typography>
            </Paper>
          </Grid>
        </Grid>}
      </ViewLayout>
    </Box>
    
  )
}

// const mapStateToProps = state => ({
//   groups: state.groups.data
// })

const mapDispatchToProps = dispatch => ({
  onHandleGetEventReport: eventId => dispatch(handleGetEventReport(eventId))
})

export default connect(null, mapDispatchToProps)(
  withParams(
    withNavigation(
      withStyles(styles)(EventReport)
    )
  )
);