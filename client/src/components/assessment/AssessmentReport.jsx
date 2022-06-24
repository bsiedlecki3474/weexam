
import { useState, useEffect } from 'react';
import withNavigation from "../../hoc/withNavigation";
import withParams from "../../hoc/withParams";
import { getScore } from '../../helpers';
import { ViewLayout } from '../../layouts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Box,
  IconButton
} from "@mui/material"

import { SimpleMaterialTable } from '..';
import { getAssessmentReport } from '../../api/events';

const AssessmentReport = props => {
  const [tableData, setTableData] = useState(null)
  const { navigate, params } = props;
  const { id } = params;

  useEffect(() => {
    getAssessmentReport(id).then(res => setTableData(res));
  }, [id])

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
    <SimpleMaterialTable
      columns={columns}
      data={data}
    />
  )
}

export default
  withParams(
    withNavigation(
      AssessmentReport
    )
  )