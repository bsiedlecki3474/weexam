
import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withNavigation from "../../hoc/withNavigation";
import withParams from "../../hoc/withParams";
import { getScore } from '../../helpers';
import { ViewLayout } from '../../layouts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Box,
  IconButton,
  Typography
} from "@mui/material"

import { SimpleMaterialTable } from '..';
import { getUserAssessmentReport } from '../../api/users';
import { format } from 'date-fns';

const styles = theme => ({
  root: {
    height: '100%'
  },
})

const UserAssessmentReport = props => {
  const [tableData, setTableData] = useState(null)
  const { navigate, params } = props;
  const { testId, eventId, userId } = params;

  useEffect(() => {
    getUserAssessmentReport(eventId, userId).then(res => setTableData(res));
  }, [userId, eventId])

  const columns = [
    { id: 'content', label: 'Question' },
    { id: 'userAnswer', label: 'User answer' },
    { id: 'correctAnswer', label: 'Correct answer' },
    { id: 'score', label: 'Score' },
  ]

  const data = tableData && tableData.map(row => ({
    id: row.id,
    content: row.content,
    userAnswer: row.userAnswer ?? window.DASH,
    correctAnswer: row.correctAnswer,
    showScores: row.showScores ?? window.DASH,
    score: getScore(row.countCorrect, row.countTotal),
  }));

  return (
    <Box>
      <ViewLayout
        title={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton edge="end" size="small" onClick={e => navigate(`/tests/${testId}/event/${eventId}/report`)}>
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            User answers
          </Box>
        }
      >
        <SimpleMaterialTable
          columns={columns}
          data={data}
        />
      </ViewLayout>
    </Box>
  )
}

export default
  withParams(
    withNavigation(
      withStyles(styles)(UserAssessmentReport)
    )
  )