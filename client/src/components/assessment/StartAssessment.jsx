import { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";

import {
  Box,
  Grid,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material"

import { ViewLayout } from '../../layouts';

import { getAssessment, startAssessment } from "../../api/assessments";

import lang from '../../lang'

const styles = theme => ({
  root: {
    height: '100%'
  },
  answerContainer: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  floatingButton: {
    position: 'fixed !important',
    bottom: theme.spacing(3),
    right: theme.spacing(3)
  }
})

const StartAssessment = props => {
  const { classes, params } = props;
  const { id } = params;

  const [assessment, setAssessment] = useState({});

  useEffect(() => {
    // getAnswerTypes().then(res => setAnswerTypes(res))
    // getQuestions(id).then(res => res?.length && setQuestions(res));
    getAssessment(id).then(res => setAssessment(res))
  }, [])

  const handleStartAssessment = e => startAssessment(id)

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
    isActive
  } = assessment;

  return (
    <Box className={classes.root}>
      <ViewLayout
        title={name}
        actions={[
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
                <TableRow key={1}>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">{name}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Start date</TableCell>
                  <TableCell align="center">{eventStartDate}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">End date</TableCell>
                  <TableCell align="center">{eventEndDate}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Duration</TableCell>
                  <TableCell align="center">{duration} min</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Questions</TableCell>
                  <TableCell align="center">{questions}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Administrator</TableCell>
                  <TableCell align="center">{administrator}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Event active</TableCell>
                  <TableCell align="center">{isEventActive}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Assessment active</TableCell>
                  <TableCell align="center">{isActive}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Table>
              <TableBody>
                <TableRow key={1}>
                  <TableCell align="left">Started at</TableCell>
                  <TableCell align="center">{startDate}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Submitted at</TableCell>
                  <TableCell align="center">{endDate ?? 'not submitted (lang)'}</TableCell>
                </TableRow>
                <TableRow key={1}>
                  <TableCell align="left">Finishes at</TableCell>
                  <TableCell align="center">{expectedEndDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </ViewLayout>
    </Box>
  )
}

export default withParams(withStyles(styles)(StartAssessment));