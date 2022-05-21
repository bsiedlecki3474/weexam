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

const Summary = ({ assessment, handleStartAssessment }) => {
  const {
    name,
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
    assessmentStarted
  } = assessment;

  return (
    <ViewLayout
      title={name}
      actions={userFinished || !isEventActive || assessmentStarted ? [] : [
        <Button
          // sx={{ float: 'right' }}
          size="small"
          variant="outlined"
          onClick={handleStartAssessment}
        >start</Button>  
      ]}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Table>
            <TableBody>
              <TableRow z>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">{name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Start date</TableCell>
                <TableCell align="center">{eventStartDate
                    ? format(new Date(eventStartDate), "dd-MM-yyyy HH:mm")
                    : window.DASH}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">End date</TableCell>
                <TableCell align="center">{eventEndDate
                    ? format(new Date(eventEndDate), "dd-MM-yyyy HH:mm")
                    : window.DASH}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Duration</TableCell>
                <TableCell align="center">{duration} min</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Questions</TableCell>
                <TableCell align="center">{questions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Administrator</TableCell>
                <TableCell align="center">{administrator}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Event active</TableCell>
                <TableCell align="center">{isEventActive}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Assessment active</TableCell>
                <TableCell align="center">{isActive}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">User has finished</TableCell>
                <TableCell align="center">{userFinished}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">Started at</TableCell>
                <TableCell align="center">{startDate
                    ? format(new Date(startDate), "dd-MM-yyyy HH:mm")
                    : window.DASH}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Submitted at</TableCell>
                <TableCell align="center">{endDate
                    ? format(new Date(endDate), "dd-MM-yyyy HH:mm")
                    : 'not submitted (lang)'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Finishes at</TableCell>
                <TableCell align="center">{expectedEndDate
                    ? format(new Date(expectedEndDate), "dd-MM-yyyy HH:mm")
                    : window.DASH}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </ViewLayout>
  )
}

export default Summary;