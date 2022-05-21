import { useState, useEffect, useMemo } from 'react'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";

import { ViewLayout } from '../../layouts';

import { getQuestions } from "../../api/assessments";

import {
  Typography,
  Box,
  Pagination
} from "@mui/material"

import Stepper from '../Stepper'

import AssessmentQuestion from '../question/AssessmentQuestion'
import AssessmentPagination from './AssessmentPagination.jsx'

const styles = theme => ({
  root: {
    height: 'calc(100vh - 112px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
    // width: '190%'
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

const Assessment = props => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { id, classes } = props;

  useEffect(() => {
    getQuestions(id).then(res => res?.length && setQuestions(res));
  }, [id])

  const answered = [];
  const flagged = [];

  answered.push(1,2,4,15)
  flagged.push(4,9)

  return (
    <Box className={classes.root}>
    {/* <ViewLayout style={{ height: 'calc(100vh - 112px)' }}> */}
      <AssessmentQuestion
        index={questionIndex}
        question={questions[questionIndex]}
      />
      
      {/* <Stepper
        fullWidth
        steps={12}
        activeStep={questionIndex}
        setActiveStep={val => setQuestionIndex(val)}
      /> */}
      <AssessmentPagination
        fullWidth
        count={30}
        page={questionIndex + 1}
        handleChange={(e, val) => setQuestionIndex(val - 1)}
        answered={answered}
        flagged={flagged}
      />
    {/* </ViewLayout> */}
    </Box>
  )

}

const mapDispatchToProps = dispatch => ({
  // onSaveQuestions: (testId, questions) => dispatch(handleSaveQuestions(testId, questions)),
  // showSnackbar: data => dispatch(showSnackbar(data))
})

export default connect(null, mapDispatchToProps)(withParams(withStyles(styles)(Assessment)));
