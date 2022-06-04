import { useState, useEffect } from 'react'

import {
  Typography,
  Box,
  Paper,
  FormControl,
  RadioGroup,
  IconButton
} from "@mui/material"

import { withStyles } from '@mui/styles';
import QuestionControl from "../question/QuestionControl";

import { connect } from "react-redux"

import FlagIcon from '@mui/icons-material/Flag';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: theme.spacing(8)
  },
  question: {
    position: 'relative',
    height: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  flagIcon: {
    position: 'absolute !important',
    right: theme.spacing(2),
    top: theme.spacing(2)
  }
})

const AssessmentQuestion = props => {
  const { classes, index, question, questionCount, isFlagged, handleChangeFlagged, checkedAnswers } = props
  const questionNumber = index + 1;

  const [answers, setAnswers] = useState([]);

  // const toggleQuestionAnswer = id => e => {
  //   switch (question?.answerTypeId) {
  //     case 1: setAnswers([id]); break;
  //     case 2: setAnswers(
  //       e.target.checked
  //         ? [...answers, id]
  //         : answers.filter(el => el !== id)
  //     ); break;
  //   }
  // }
  
  const toggleQuestionAnswer = (questionId, answerId) => e => {
    const { handleToggleAnswer } = props;
    handleToggleAnswer(questionId, answerId, question.answerTypeId);
  }

  // console.log(question?.answers)

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h4" component="h1">Question {questionCount ? `${questionNumber} of ${questionCount}` : `#${questionNumber}`}</Typography>    
      </Box>
      <Paper elevation={3} className={classes.question}>
        <Typography variant="h6" component="p" mb={4}>{question?.content}</Typography>

        <FormControl fullWidth>
          <RadioGroup>
            {(question?.answers ?? []).map(a => <QuestionControl
              key={a.id}
              // checked={answers?.includes(a.id)}
              checked={checkedAnswers[question.id]?.includes(a.id)}
              value={a.value}
              answerTypeId={question?.answerTypeId}
              handleChange={toggleQuestionAnswer(question?.id, a.id)}
            />)}
          </RadioGroup>
        </FormControl>

        <IconButton
          size="large"
          className={classes.flagIcon}
          color={isFlagged ? 'warning' : 'inherit'}
          onClick={handleChangeFlagged(index)}
        >
          <FlagIcon />
        </IconButton>    
        
      </Paper>
    </Box>

  )
}

const mapStateToProps = state => ({
  checkedAnswers: state.assessment.answers
})

// const mapDispatchToProps = dispatch => ({
//   // onSaveQuestions: (testId, questions) => dispatch(handleSaveQuestions(testId, questions)),
//   // showSnackbar: data => dispatch(showSnackbar(data))
//   onHandleToggleAnswer: (answerId, answerTypeId) => dispatch(handleToggleAnswer(answerId, answerTypeId)),
//   onHandleFlagQuestion: questionIndex => dispatch(handleFlagQuestion(questionIndex)),
//   onHandleSetQuestion: questionIndex => dispatch(handleSetQuestion(questionIndex))
// })

export default connect(mapStateToProps, null)(withStyles(styles)(AssessmentQuestion));