import {
  Button,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material"

import { ViewLayout } from '../../layouts';

import { format } from "date-fns";
import { getPercent } from "../../helpers";
import {
  AssessmentSummary,
  AssessmentReport
} from "./";

const AssessmentDetails = ({ assessment, handleStartAssessment }) => {
  const {
    testName,
    isEventActive,
    userFinished,
    assessmentStarted,
  } = assessment;

  return (
    <ViewLayout
      title={testName}
      actions={userFinished || !isEventActive || assessmentStarted ? [] : [
        <Button
          // sx={{ float: 'right' }}
          size="small"
          variant="outlined"
          onClick={handleStartAssessment}
        >start</Button>  
      ]}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <AssessmentSummary assessment={assessment} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <AssessmentReport />
        </Grid>
      </Grid>
    </ViewLayout>
  )
}

export default AssessmentDetails;