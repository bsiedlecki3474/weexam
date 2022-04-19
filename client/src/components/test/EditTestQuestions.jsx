import { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';
import withParams from "../../hoc/withParams";

import {
  Box,
  Grid,
  Button,
  Fab
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';

import { Form, TextField, Select } from '../form';
import { ViewLayout } from '../../layouts';

import Question from '../question/Question.jsx';

import { handleSaveQuestions } from '../../redux/actions/questions';
import { showSnackbar } from '../../redux/actions/snackbar'

import { getAnswerTypes } from "../../api/questions";
import { getQuestions } from "../../api/tests";

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

const getAnswerTemplate = key => ({ id: key, value: null, checked: false, edit: true })
const getQuestionTemplate = key => ({ id: key, content: null, answers: [getAnswerTemplate(1)], answerTypeId: 1 })

const EditTestQuestions = props => {
  const { classes, params, onSaveQuestions } = props;
  const { id } = params;

  const [questions, setQuestions] = useState([getQuestionTemplate(1)]);
  const [answerTypes, setAnswerTypes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAnswerTypes().then(res => setAnswerTypes(res))
    getQuestions(id).then(res => res?.length && setQuestions(res));
  }, [])

  const handleQuestionUpdate = (qi, property, value) => {
    setQuestions(
      questions.map((el, i) => {
        if (i !== qi)
          return el;

        return {
          ...el,
          ...{
            ...questions[qi],
            [property]: value
          }
        }
      })
    )
  }

  const handleAnswerUpdate = (qi, ai, property, value) => 
    handleQuestionUpdate(qi, 'answers', questions[qi].answers.map((el, i) => {
      if (i !== ai)
        return el;
      
      return {
        ...el,
        ...{
          ...questions[qi].answers[ai],
          [property]: value
        }
      }
    }));
  

  const handleToggleAnswer = (qi, ai, typeId) => {
    handleQuestionUpdate(qi, 'answers', questions[qi].answers.map((el, i) => {
      if (i !== ai)
        return typeId == 2 ? el : {
          ...el,
          ...{
            ...questions[qi].answers[i],
            checked: false
          }
        }

      return {
        ...el,
        ...{
          ...questions[qi].answers[i],
          checked: !questions[qi].answers[ai].checked
        }
      };
      
      
    }));
  }

  const handleAddAnswer = (qi) => {
    const answers = [
      ...questions[qi].answers,
      getAnswerTemplate(questions[qi].answers.length + 1)
    ];
    handleQuestionUpdate(qi, 'answers', answers);
  }

  const handleDeleteAnswer = (qi, ai) => {
    const answers = questions[qi].answers.filter((el, i) => i !== ai);
    handleQuestionUpdate(qi, 'answers', answers);
  }

  const handleDeleteQuestion = (qi) => {
    setOpen(false);
    setQuestions(questions.filter((el, i) => i !== qi));
  }

  const handleAddQuestion = e => {
    // const { onAddQuestion } = props;
    // onAddQuestion();
    setQuestions([...questions, getQuestionTemplate(questions.length + 1)]);
  }

  const handleOpen = index => (e, isExpanded) => setOpen(isExpanded ? index : false);

  const handleClickSaveQuestionsButton = e => {
    const { onSaveQuestions, showSnackbar } = props;
    onSaveQuestions(id, questions).then(
      showSnackbar({
        message: lang.main.snackbar.changesSaved,
        severity: 'success'
      })
    )
  }

  return (
    <Box className={classes.root}>
      <ViewLayout
        title="Edit questions"
        actions={[
          <Button
            // sx={{ float: 'right' }}
            size="small"
            variant="outlined"
            onClick={handleClickSaveQuestionsButton}
          >save</Button>  
        ]}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {questions?.map((q, qi) => {
            return (
              <Question
                key={qi}
                data={q}
                index={qi}
                open={open}
                handleChange={handleOpen}
                handleQuestionUpdate={handleQuestionUpdate}
                handleAnswerUpdate={handleAnswerUpdate}
                handleAddAnswer={handleAddAnswer}
                handleDeleteAnswer={handleDeleteAnswer}
                handleDeleteQuestion={handleDeleteQuestion}
                handleToggleAnswer={handleToggleAnswer}
                answerTypes={answerTypes} 
              />
            )
          })}
        </Grid>
        <Fab
          color="primary"
          size="small"
          className={classes.floatingButton}
          onClick={handleAddQuestion}
        >
          <AddIcon />
        </Fab>
      </ViewLayout>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  onSaveQuestions: (testId, questions) => dispatch(handleSaveQuestions(testId, questions)),
  showSnackbar: data => dispatch(showSnackbar(data))
})


export default connect(null, mapDispatchToProps)(withParams(withStyles(styles)(EditTestQuestions)));

// export default withStyles(styles)(EditTestQuestions);