import { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux"
import { withStyles } from '@mui/styles';

import {
  Box,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  IconButton
} from "@mui/material"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { Form, TextField, Select } from '../form';
// import AddNewQuestion from '../question/AddNewQuestion';
import Question from '../question/Question.jsx';

import { addQuestion } from '../../redux/actions/questions';

import { getAnswerTypes } from "../../api/questions";

const styles = theme => ({
  answerContainer: {
    width: '100%',
    marginBottom: theme.spacing(2)
  }
})

const getAnswerTemplate = key => ({ id: key, value: null, checked: false, edit: true })
const getQuestionTemplate = key => ({ id: key, content: null, answers: [getAnswerTemplate(1)], answerTypeId: 1 })


const EditTestQuestions = props => {
  const { classes, /*questions,*/ onAddQuestion } = props;

  const formRef = useRef();
  const [questions, setQuestions] = useState([getQuestionTemplate(1)]);
  const [answerTypes, setAnswerTypes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAnswerTypes().then(res => setAnswerTypes(res))
  })

  // const addQuestion = () => setQuestions([...questions, getQuestionTemplate(questions.length + 1)])

  // const changeQuestionContent = (qi) => e => {
  //   let newQuestions = [...questions];
  //   newQuestions[qi].content = e.target.value;
  //   setQuestions(newQuestions);
  // }

  // const changeQuestionAnswerType = (qi) => e => {
  //   let newQuestions = [...questions];
  //   newQuestions[qi].answerTypeId = e.target.value;
  //   setQuestions(newQuestions);
  // }
  
  // const addQuestionAnswer = (qi) => e => {
  //   let newQuestions = [...questions];
  //   newQuestions[qi].answers = [...newQuestions[qi].answers, getAnswerTemplate(newQuestions[qi].answers.length + 1)];
  //   setQuestions(newQuestions);
  // }

  // // ======================


  // const toggleAnswerEdit = (qi, ai) => e => {
  //   let newQuestions = [...questions];
  //   newQuestions[qi].answers[ai].edit = !newQuestions[qi].answers[ai].edit;
  //   setQuestions(newQuestions);
  // }

  // const deleteQuestionAnswer = (qi, ai) => e => {
  //   const question = questions[qi];
  //   const answers = [...question.answers.filter((el, i) => i !== ai)];
  //   question.answers = answers;
  //   setQuestions([...questions.filter((el, i) => i !== qi), question]);
  // }

  // const toggleQuestionAnswer = (qi, ai) => e => {
  //   let newQuestions = [...questions];
  //   const answerTypeId = newQuestions[qi].answerTypeId;
  //   if (answerTypeId === 1) {
  //     for (let newai in newQuestions[qi].answers) {
  //       newQuestions[qi].answers[newai].checked = false;
  //     }
  //     newQuestions[qi].answers[ai].checked = true;
  //   } else if (answerTypeId === 2) {
  //     newQuestions[qi].answers[ai].checked = !newQuestions[qi].answers[ai].checked;
  //   }
    
  //   setQuestions(newQuestions);
  // }

  // const handleQuestionAnswerchange = (qi, ai) => e => {
  //   let newQuestions = [...questions];
  //   newQuestions[qi].answers[ai].value = e.target.value;
    
  //   setQuestions(newQuestions);
  // }

  // const answerTypeControls = {
  //   1: <Radio />,
  //   2: <Checkbox />
  // }

  // const handleQuestionUpdate = (qi, field, value) => {
  //   let newQuestions = [...questions];
  //   newQuestions[qi][field] = value;
  //   // setQuestions(newQuestions);
  // }

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
            ...questions[qi].answers[ai],
            checked: false
          }
        }

      return {
        ...el,
        ...{
          ...questions[qi].answers[ai],
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
    setQuestions(questions.filter((el, i) => i !== qi));
  }

  const handleAddQuestion = e => {
    // const { onAddQuestion } = props;
    // onAddQuestion();
    setQuestions([...questions, getQuestionTemplate(questions.length + 1)]);
  }

  const handleOpen = id => (e, isExpanded) => setOpen(isExpanded ? id : false);

  return (
    <Box sx={{ height: 'calc(100vh - 112px)' }}>
      {/* <Form
        formRef={formRef}
        title={
          <div>
            Edit questions
            <Button
              sx={{ float: 'right' }}
              size="small"
              variant="outlined"
              onClick={handleAddQuestion}
            >add question</Button>  
          </div>
        }
        fullHeight
        submitButton={
          <Button variant="outlined" size="small">save</Button>
        }
      > */}
      <Button
        // sx={{ float: 'right' }}
        size="small"
        variant="outlined"
        onClick={handleAddQuestion}
      >add question</Button>  
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
      {/* </Form> */}
    </Box>
  )
}

// const mapStateToProps = ({ questions }) => ({
//   questions
// })


// const mapDispatchToProps = dispatch => ({
//   onAddQuestion: () => dispatch(addQuestion())
// })


// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditTestQuestions));

export default withStyles(styles)(EditTestQuestions);