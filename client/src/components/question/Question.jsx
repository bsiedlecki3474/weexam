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
  RadioGroup,
  FormControl,
  IconButton
} from "@mui/material"

import QuestionControl from './QuestionControl';

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

const Question = props => {
  const {
    classes,
    data,
    index,
    open,
    handleChange,
    handleDeleteQuestion,
    answerTypes
  } = props;

  const changeQuestionContent = (index) => e => {
    const { handleQuestionUpdate } = props;
    handleQuestionUpdate(index, 'content', e.target.value);
  }

  const changeQuestionAnswerType = (index) => e => {
    const { handleQuestionUpdate } = props;
    handleQuestionUpdate(index, 'answerTypeId', e.target.value)
  }
  
  const addQuestionAnswer = (index) => e => {
    const { handleAddAnswer } = props;
    handleAddAnswer(index);
  }

  // ======================


  const toggleAnswerEdit = (index, ai, value) => e => {
    const { handleAnswerUpdate } = props;
    handleAnswerUpdate(index, ai, 'edit', value);
  }

  const deleteQuestionAnswer = (index, ai) => e => {
    const { handleDeleteAnswer } = props;
    handleDeleteAnswer(index, ai);
  }

  const toggleQuestionAnswer = (index, ai, typeId) => e => {
    const { handleToggleAnswer } = props;
    handleToggleAnswer(index, ai, typeId)
  }

  const handleUpdateQuestionAnswer = (index, ai) => e => {
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
                      <QuestionControl
                        checked={a?.checked}
                        value={a?.value}
                        edit={a?.edit}
                        editTextfield={
                          <TextField
                            id={`question-${index}-answer-${ai}`}
                            size="small"
                            placeholder={`Answer #` + (ai + 1)}
                            handleChange={handleUpdateQuestionAnswer(index, ai)}
                            margin="dense"
                            value={a?.value}
                          />
                        }
                        answerTypeId={data?.answerTypeId}
                        handleChange={toggleQuestionAnswer(index, ai, data?.answerTypeId)}
                      />
                      {/* <FormControlLabel
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
                      /> */}
                      <div style={{ marginLeft: 'auto' }}>
                        <IconButton size="small" onClick={toggleAnswerEdit(index, ai, !a?.edit)}>
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