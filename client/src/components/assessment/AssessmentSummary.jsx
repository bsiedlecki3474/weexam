import {
  Button,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material"

import { SimpleMaterialTable } from '..';

import { ViewLayout } from '../../layouts';

import { format } from "date-fns";
import { getPercent } from "../../helpers";

const AssessmentDetails = ({ assessment }) => {
  const {
    testName,
    eventStartDate,
    eventEndDate,
    startDate,
    endDate,
    expectedEndDate,
    duration,
    questions,
    administrator,
    isEventActive,
    isActive,
    userFinished,
    assessmentStarted,

    totalScore,
    userScore
  } = assessment;

  const columns = [
    { id: 'name', bold: true },
    { id: 'value' }
  ]

  const data = [
    { name: 'Name', value: testName },
    { name: 'Start date', value: eventStartDate
      ? format(new Date(eventStartDate), "dd-MM-yyyy HH:mm")
      : window.DASH },
    { name: 'End date', value: eventEndDate
      ? format(new Date(eventEndDate), "dd-MM-yyyy HH:mm")
      : window.DASH },
    { name: 'Duration', value: duration + ' min' },
    { name: 'Questions', value: questions },
    { name: 'Administrator', value: administrator },
    { name: 'Started at', value: startDate
      ? format(new Date(startDate), "dd-MM-yyyy HH:mm")
      : window.DASH },
    { name: 'Finishes at', value: expectedEndDate
      ? format(new Date(expectedEndDate), "dd-MM-yyyy HH:mm")
      : window.DASH },
    { name: 'Submitted at', value: endDate
      ? format(new Date(endDate), "dd-MM-yyyy HH:mm")
      : 'not submitted (lang)' },
    { name: 'Your score', value: userScore },
    { name: 'Total score', value: totalScore },
    { name: 'Your %', value: getPercent(userScore, totalScore) },
  ]

  return <SimpleMaterialTable
    disableHeader
    columns={columns}  
    data={data}
  />

}

export default AssessmentDetails;