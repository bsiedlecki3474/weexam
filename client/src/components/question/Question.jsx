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
import AddNewQuestion from './AddNewQuestion';

// import {
//   updateContent,
//   updateAnswerType
// } from '../../redux/actions/questions';

const styles = theme => ({
  answerContainer: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  questionActionsContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    gap: theme.spacing(2)
  }
})

const answerTypeControls = {
  1: <Radio />,
  2: <Checkbox />
}

const Question = props => {
  const {
    classes,
    data,
    index,
    open,
    handleChange,
    // handleQuestionUpdate,
    // handleAnswerUpdate,
    // handleAddAnswer,
    // handleDeleteAnswer,
    handleDeleteQuestion,
    answerTypes
  } = props;

  const [timer, setTimer] = useState(null);

  // const getAnswerTemplate = key => ({ id: key, value: null, checked: false, edit: true })
  // const getQuestionTemplate = key => ({ id: key, content: null, answers: [getAnswerTemplate(1)], answerTypeId: 1 })

  // const [questions, setQuestions] = useState([getQuestionTemplate(1)]);





  const changeQuestionContent = (index) => e => {
    // let newQuestions = [...questions];
    // newQuestions[index].content = e.target.value;
    // setQuestions(newQuestions);
    const { handleQuestionUpdate } = props;
    handleQuestionUpdate(index, 'content', e.target.value);

    
    // const { onUpdateContent } = props;
    // onUpdateContent(index, e.target.value);
  }

  const changeQuestionAnswerType = (index) => e => {
    // let newQuestions = [...questions];
    // newQuestions[index].answerTypeId = e.target.value;
    // setQuestions(newQuestions);
    const { handleQuestionUpdate } = props;
    handleQuestionUpdate(index, 'answerTypeId', e.target.value)
    // console.log(e.target.value)
    
    // const { onUpdateAnswerType } = props;
    // onUpdateAnswerType(index, e.target.value);
    
  }
  
  const addQuestionAnswer = (index) => e => {
    // let newQuestions = [...questions];
    // newQuestions[index].answers = [...newQuestions[index].answers, getAnswerTemplate(newQuestions[index].answers.length + 1)];
    // setQuestions(newQuestions);
    const { handleAddAnswer } = props;
    handleAddAnswer(index);
  }

  // ======================


  const toggleAnswerEdit = (index, ai) => e => {
    // let newQuestions = [...questions];
    // newQuestions[index].answers[ai].edit = !newQuestions[index].answers[ai].edit;
    // setQuestions(newQuestions);
    const { handleAnswerUpdate } = props;
    handleAnswerUpdate(index, ai, 'edit', e.target.value);
  }

  const deleteQuestionAnswer = (index, ai) => e => {
    // const question = questions[index];
    // const answers = [...question.answers.filter((el, i) => i !== ai)];
    // question.answers = answers;
    // setQuestions([...questions.filter((el, i) => i !== index), question]);
      const { handleDeleteAnswer } = props;
    handleDeleteAnswer(index, ai);
  }

  const toggleQuestionAnswer = (index, ai, typeId) => e => {
    // let newQuestions = [...questions];
    // const answerTypeId = newQuestions[index].answerTypeId;
    // if (answerTypeId === 1) {
    //   for (let newai in newQuestions[index].answers) {
    //     newQuestions[index].answers[newai].checked = false;
    //   }
    //   newQuestions[index].answers[ai].checked = true;
    // } else if (answerTypeId === 2) {
    //   newQuestions[index].answers[ai].checked = !newQuestions[index].answers[ai].checked;
    // }
    
    // setQuestions(newQuestions);


    // const { handleAnswerUpdate } = props;
    // handleAnswerUpdate(index, ai, 'checked', e.target.value);

    const { handleToggleAnswer } = props;
    handleToggleAnswer(index, ai, typeId)
  }

  const handleUpdateQuestionAnswer = (index, ai) => e => {
    // let newQuestions = [...questions];
    // newQuestions[index].answers[ai].value = e.target.value;
    
    // setQuestions(newQuestions);
    const { handleAnswerUpdate } = props;
    handleAnswerUpdate(index, ai, 'value', e.target.value);
  }

  return (
    <Accordion
      expanded={open === index}
      onChange={handleChange(index)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Question #{index + 1}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {data?.content}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={4}>
          <Grid item sm={12} md={8} lg={9}>
            <TextField
              id={"question-" + (index + 1)}
              label="Content"
              value={data?.content}
              handleChange={changeQuestionContent(index)}
              // required
              // isLoading={isLoading || isDataLoading()}
              // error={showErrors && !data.name}
              // helperText={lang.main.validation.empty}
            />
          </Grid>
          <Grid item sm={12} md={4} lg={3}>
            <Select
              id="answerTypeId"
              value={data?.answerTypeId}
              label="Answer type"
              options={answerTypes}
              handleChange={changeQuestionAnswerType(index)}
              // required
              // error={showErrors && !data.role}
              // helperText={lang.main.validation.empty}
              // isLoading={isLoading || this.isDataLoading()}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item sm={12} md={8} lg={9}>
            <FormControl fullWidth>
              <RadioGroup>
                {data?.answers?.map((a, ai) => 
                  <div key={ai}>
                    <Box display="flex">
                      <FormControlLabel
                        // sx={{ width: '100%' }}
                        checked={a?.checked}
                        onChange={toggleQuestionAnswer(index, ai, data?.answerTypeId)}
                        disabled={!a?.value}
                        control={
                          answerTypeControls[data?.answerTypeId ?? 1]
                        }
                        // value={el.value}
                        label={
                          a?.edit
                          ? <TextField
                              id={`question-${index}-answer-${ai}`}
                              size="small"
                              placeholder={`Answer #` + (ai + 1)}
                              handleChange={handleUpdateQuestionAnswer(index, ai)}
                              margin="dense"
                            value={a?.value}
                          />
                          : a?.value ?? 'Edit answer...'
                        }
                      />
                      <div style={{ marginLeft: 'auto' }}>
                        <IconButton size="small" onClick={toggleAnswerEdit(index, ai)}>
                          {a?.edit
                            ? <CheckIcon fontSize="inherit" />
                            : <EditIcon fontSize="inherit" />
                          }
                        </IconButton>
                        <IconButton size="small" onClick={deleteQuestionAnswer(index, ai)}>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    </Box>
                  </div>
                )}

                <AddNewQuestion
                  answerTypeId={data?.answerTypeId}
                  onClick={addQuestionAnswer(index)} />
              </RadioGroup>
            </FormControl>
    
            
          </Grid>
          <Grid item sm={12} md={4} lg={3}>
            <Box className={classes.questionActionsContainer} >
              <Button
                sx={{ alignSelf: 'flex-end' }}
                size="small"
                variant="outlined"
                color="error"
                onClick={e => handleDeleteQuestion(index)}
              >delete</Button>
              <Button
                sx={{ alignSelf: 'flex-end' }}
                size="small"
                variant="outlined"
                // onClick={addQuestion}
              >save</Button>
              
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

// const mapStateToProps = ({ questions }) => ({
//   questions
// })

// const mapDispatchToProps = dispatch => ({
//   onUpdateContent: (questionId, value) => dispatch(updateContent(questionId, value)),
//   onUpdateAnswerType: (questionId, value) => dispatch(updateAnswerType(questionId, value)),
// })

// export default connect(null, mapDispatchToProps)(withStyles(styles)(Question));
export default withStyles(styles)(Question);