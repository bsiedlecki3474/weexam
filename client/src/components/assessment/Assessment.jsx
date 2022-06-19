import { useState, useEffect, useMemo } from 'react'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";
import { useLocalStorage } from '../../hooks';

import { ViewLayout } from '../../layouts';

import { getQuestions } from "../../api/assessments";

import {
  handleSubmitAssessment,
  handleFlagQuestion,
  handleSaveAnswers,
  handleSetQuestion,
  handleToggleAnswer,
  handleClearChangedQuestions,
  handleSetQuestionAnswered
} from '../../redux/actions/assessment';

import { Box } from "@mui/material"

import {
  AssessmentQuestion,
  AssessmentPagination,
  AssessmentCountdown
} from './'

const styles = theme => ({
  root: {
    height: 'calc(100vh - 112px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
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

  const { eventId, assessmentId, endDate, classes, answered, flagged, questionIndex, changeQuestion, onHandleFlagQuestion, onHandleSubmitAssessment } = props;

  useEffect(() => {
    getQuestions(eventId).then(res => res?.length && setQuestions(res));
  }, [eventId])

  const handleChangeFlagged = index => e => onHandleFlagQuestion(index)

  const question = questions[questionIndex];

  console.log(assessmentId)

  return (
    <Box className={classes.root}>
    {/* <ViewLayout style={{ height: 'calc(100vh - 112px)' }}> */}
      <AssessmentCountdown endDate={endDate} />
      <AssessmentQuestion
        index={questionIndex}
        question={question}
        questionCount={questions?.length}
        isFlagged={(flagged ?? []).includes(questionIndex)}
        handleChangeFlagged={handleChangeFlagged}
        handleToggleAnswer={props.onHandleToggleAnswer}
        handleSubmitAssessment={e => onHandleSubmitAssessment(assessmentId)}
      />
      
      {questions?.length && <AssessmentPagination
        fullWidth
        count={questions.length}
        page={questionIndex + 1}
        handleChange={(_, val) => changeQuestion(val - 1, assessmentId)}
        answered={answered}
        flagged={flagged}
      />}
    {/* </ViewLayout> */}
    </Box>
  )

}

const mapStateToProps = state => ({
  flagged: state.assessment.flagged,
  answered: state.assessment.answered,
  questionIndex: state.assessment.questionIndex
})

const mapDispatchToProps = dispatch => ({
  // onSaveQuestions: (testId, questions) => dispatch(handleSaveQuestions(testId, questions)),
  // showSnackbar: data => dispatch(showSnackbar(data))
  onHandleSubmitAssessment: (id) => dispatch(handleSubmitAssessment(id)),
  onHandleToggleAnswer: (questionId, answerId, answerTypeId, questionIndex) =>
    dispatch(handleToggleAnswer(questionId, answerId, answerTypeId))
    && dispatch(handleSetQuestionAnswered(questionIndex)),
  onHandleFlagQuestion: questionIndex => dispatch(handleFlagQuestion(questionIndex)),
  onHandleSetQuestion: questionIndex => dispatch(handleSetQuestion(questionIndex)),
  changeQuestion: (questionIndex, id) => {
    dispatch(handleSetQuestion(questionIndex))
      && dispatch(handleSaveAnswers(id))
      && dispatch(handleClearChangedQuestions())
  }
 
})

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withStyles(styles)(Assessment)));
