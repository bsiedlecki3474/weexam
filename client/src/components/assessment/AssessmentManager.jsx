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

import { Assessment, AssessmentSummary } from './'

import { getAssessment } from "../../api/assessments";
import { handleStartAssessment } from '../../redux/actions/assessment';

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
  const { classes, params, onHandleStartAssessment } = props;
  const { id } = params;

  const [assessment, setAssessment] = useState({});

  useEffect(() => {
    getAssessment(id).then(res => setAssessment(res))
  }, [id])

  // const onHandleStartAssessment = e => handleStartAssessment(id)

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
          ? <Assessment id={id} endDate={assessment?.expectedEndDate} />
          : <AssessmentSummary
              assessment={assessment}
              handleStartAssessment={e => onHandleStartAssessment(id)}
            />
      )}      
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  onHandleStartAssessment: (id) => dispatch(handleStartAssessment(id)),
})


export default connect(null, mapDispatchToProps)(withParams(withStyles(styles)(AssessmentManager)));