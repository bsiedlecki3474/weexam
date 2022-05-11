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

import { Assessment, Summary } from './'

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

const AssessmentManager = props => {
  const { classes, params } = props;
  const { id } = params;

  const [assessment, setAssessment] = useState({});

  useEffect(() => {
    getAssessment(id).then(res => setAssessment(res))
  }, [])

  const handleStartAssessment = e => startAssessment(id)

  const {
    isEventActive,
    isActive,
    userFinished,
  } = assessment;

  return (
    <Box className={classes.root}>
      {assessment && (
        // isCompleted && !(isEventActive && isActive)
        isEventActive && isActive && !userFinished
          ? <Assessment />
          : <Summary
              assessment={assessment}
              handleStartAssessment={handleStartAssessment}
            />
      )}      
    </Box>
  )
}

export default withParams(withStyles(styles)(AssessmentManager));