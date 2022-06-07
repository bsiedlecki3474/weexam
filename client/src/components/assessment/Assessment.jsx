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

  const { id, endDate, classes, answered, flagged, questionIndex, changeQuestion, onHandleFlagQuestion } = props;

  useEffect(() => {
    getQuestions(id).then(res => res?.length && setQuestions(res));
  }, [id])

  const handleChangeFlagged = index => e => onHandleFlagQuestion(index)

  const question = questions[questionIndex];

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
      />
      
      {questions?.length && <AssessmentPagination
        fullWidth
        count={questions.length}
        page={questionIndex + 1}
        handleChange={(_, val) => changeQuestion(val - 1, id)}
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
  onHandleToggleAnswer: (questionId, answerId, answerTypeId, questionIndex) =>
    dispatch(handleToggleAnswer(questionId, answerId, answerTypeId))
    && dispatch(handleSetQuestionAnswered(questionIndex)),
  onHandleFlagQuestion: questionIndex => dispatch(handleFlagQuestion(questionIndex)),
  onHandleSetQuestion: questionIndex => dispatch(handleSetQuestion(questionIndex)),
  changeQuestion: (questionIndex, id) => {
    dispatch(handleSetQuestion(questionIndex))
      && dispatch(handleSaveAnswers(id))
      && dispatch(handleClearChangedQuestions(id))
  }
 
})

export default connect(mapStateToProps, mapDispatchToProps)(withParams(withStyles(styles)(Assessment)));
