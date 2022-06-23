
import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withNavigation from "../../hoc/withNavigation";
import withParams from "../../hoc/withParams";
import { getPercent } from '../../helpers';

import lang from '../../lang'

import {
  Box,
  Typography,
  Grid
} from "@mui/material"

import { MaterialTable } from '../';
import { getEventAssessmentList } from '../../api/events';
import { format } from 'date-fns';

const styles = theme => ({
  root: {
    height: '100%'
  },
})

const EventReportTiles = props => {
  const [tableData, setTableData] = useState(null)
  const { navigate, params } = props;
  const { testId, eventId } = params;

  useEffect(() => {
    getEventAssessmentList(eventId).then(res => setTableData(res));
  }, [eventId])

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'startDate', label: 'Start date' },
    { id: 'userFinished', label: 'User finished' },
    { id: 'score', label: 'Score' },
  ]

  const prepareScore = (correct, total) =>
    total ? `${correct || 0}/${total} (${(correct/total*100).toFixed(2)}%)` : window.DASH

  const data = tableData && tableData.map(row => ({
    id: row.id,
    name: <a onClick={e => navigate(`/test/${testId}/event/${eventId}/user/${row.id}`)}>{row.firstName} {row.lastName}</a>,
    startDate: row.startDate ? format(new Date(row.startDate), "dd-MM-yyyy HH:mm") : window.DASH,
    userFinished: row.userFinished ? lang.main.yes : lang.main.no,
    showScores: row.showScores ?? window.DASH,
    score: prepareScore(row.countCorrect, row.countTotal),
  }));

  return (
    <Box>
      <MaterialTable
        title="Users"
        columns={columns}
        data={data}
      />
    </Box>
  )
}

export default
  withParams(
    withNavigation(
      withStyles(styles)(EventReportTiles)
    )
  )