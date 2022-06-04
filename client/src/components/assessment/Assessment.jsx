import { useState, useEffect, useMemo } from 'react'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import { useLocalStorage } from '../../hooks';

import { ViewLayout } from '../../layouts';

import { getQuestions } from "../../api/assessments";

import {
  handleFlagQuestion,
  handleSaveAnswers,
  handleSetQuestion,
  handleToggleAnswer,
  handleClearChangedQuestions
} from '../../redux/actions/assessment';

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
  // const [questionIndex, setQuestionIndex] = useState(0);
  // const [flagged, setFlagged] = useLocalStorage('flagged', []);

  const { id, classes, flagged, questionIndex, changeQuestion, onHandleFlagQuestion } = props;

  useEffect(() => {
    getQuestions(id).then(res => res?.length && setQuestions(res));
  }, [id])

  // const handleChangeFlagged = index => e => setFlagged(
  //   (flagged ?? []).includes(index)
  //     ? flagged.filter(el => el != index)
  //     : [...(flagged ?? []), index]
  // );

  const handleChangeFlagged = index => e => onHandleFlagQuestion(index)

  const answered = [];
  // const flagged = [];

  // answered.push(1,2,4,15)
  // flagged.push(4,9)

  console.log(questions, questions.length)

  const question = questions[questionIndex];

  return (
    <Box className={classes.root}>
    {/* <ViewLayout style={{ height: 'calc(100vh - 112px)' }}> */}
      <AssessmentQuestion
        index={questionIndex}
        question={question}
        questionCount={questions?.length}
        isFlagged={(flagged ?? []).includes(questionIndex)}
        handleChangeFlagged={handleChangeFlagged}
        handleToggleAnswer={props.onHandleToggleAnswer}
      />
      
      {/* <Stepper
        fullWidth
        steps={12}
        activeStep={questionIndex}
        setActiveStep={val => setQuestionIndex(val)}
      /> */}
      {questions?.length && <AssessmentPagination
        fullWidth
        count={questions.length}
        page={questionIndex + 1}
        handleChange={(e, val) => changeQuestion(val - 1, id)}
        answered={answered}
        flagged={flagged}
      />}
    {/* </ViewLayout> */}
    </Box>
  )

}

const mapStateToProps = state => ({
  flagged: state.assessment.flagged,
  questionIndex: state.assessment.questionIndex
})

const mapDispatchToProps = dispatch => ({
  // onSaveQuestions: (testId, questions) => dispatch(handleSaveQuestions(testId, questions)),
  // showSnackbar: data => dispatch(showSnackbar(data))
  onHandleToggleAnswer: (questionId, answerId, answerTypeId) => dispatch(handleToggleAnswer(questionId, answerId, answerTypeId)),
  onHandleFlagQuestion: questionIndex => dispatch(handleFlagQuestion(questionIndex)),
  onHandleSetQuestion: questionIndex => dispatch(handleSetQuestion(questionIndex)),
  changeQuestion: (questionIndex, id) => {
    dispatch(handleSetQuestion(questionIndex))
      && dispatch(handleSaveAnswers(id))
      && dispatch(handleClearChangedQuestions(id))
  }
 
})

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withStyles(styles)(Assessment)));
