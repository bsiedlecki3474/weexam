
import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withNavigation from "../../hoc/withNavigation";
import withParams from "../../hoc/withParams";
import { getPercent } from '../../helpers';

import {
  Paper,
  Typography,
  Grid
} from "@mui/material"

import { handleGetEventReport } from '../../redux/actions/events';
import { getEventReport } from '../../api/events';

const styles = theme => ({
  root: {
    height: '100%'
  },
})

const EventReportTiles = props => {
  const [report, setReport] = useState({})
  const { params } = props;
  const { eventId } = params;

  useEffect(() => {
    getEventReport(eventId).then(res => setReport(res));
  }, [eventId])

  return report && <Grid container spacing={3} py={3}>
    <Grid item lg={4} md={6} xs={12}>
      <Paper sx={{ p: 3 }}>
        <Typography>Total users</Typography>
        <Typography color="text.secondary">{report.totalUsers}</Typography>
      </Paper>
    </Grid>
    <Grid item lg={4} md={6} xs={12}>
      <Paper sx={{ p: 3 }}>
        <Typography>Completion rate</Typography>
        <Typography color="text.secondary">{getPercent(report.participants, report.totalUsers)}</Typography>
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
        <Typography color="text.secondary">{getPercent(report.averageScore, report.totalTestScore)}</Typography>
      </Paper>
    </Grid>
  </Grid>
}

const mapDispatchToProps = dispatch => ({
  onHandleGetEventReport: eventId => dispatch(handleGetEventReport(eventId))
})

export default connect(null, mapDispatchToProps)(
  withParams(
    withNavigation(
      withStyles(styles)(EventReportTiles)
    )
  )
);