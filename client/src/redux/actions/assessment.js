import {
  CLEAR_ASSESSMENT,
  START_ASSESSMENT_PENDING,
  START_ASSESSMENT_SUCCESS,
  START_ASSESSMENT_ERROR,
  SAVE_ANSWERS_PENDING,
  SAVE_ANSWERS_SUCCESS,
  SAVE_ANSWERS_ERROR,
  SUBMIT_ASSESSMENT_PENDING,
  SUBMIT_ASSESSMENT_SUCCESS,
  SUBMIT_ASSESSMENT_ERROR,
  TOGGLE_ANSWER,
  FLAG_QUESTION,
  SET_QUESTION,
  SET_ANSWERED,
  CLEAR_CHANGED_QUESTIONS
} from '../types/assessment'

import {
  startAssessment,
  submitAssessment,
  saveAnswers
} from '../../api/assessments'

const handleStartAssessment = id => async dispatch => {
  dispatch({ type: CLEAR_ASSESSMENT })
  dispatch({ type: START_ASSESSMENT_PENDING })
  try {
    const data = await startAssessment(id);
    return dispatch({ type: START_ASSESSMENT_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: START_ASSESSMENT_ERROR, payload: e })
  }
}

const handleSubmitAssessment = id => async dispatch => {
  dispatch({ type: SUBMIT_ASSESSMENT_PENDING });
  await dispatch(handleSaveAnswers(id));
  try {
    await submitAssessment(id);
    return dispatch({ type: SUBMIT_ASSESSMENT_SUCCESS })
  } catch (e) {
    return dispatch({ type: SUBMIT_ASSESSMENT_ERROR, payload: e })
  }
}

const handleClearChangedQuestions = () => dispatch => {
  return dispatch({ type: CLEAR_CHANGED_QUESTIONS });
}


const handleSaveAnswers = (assessmentId) => async (dispatch, getState) => {
  dispatch({ type: SAVE_ANSWERS_PENDING })
  try {
    const state = getState();
    const changedQuestions = state?.assessment?.changedQuestions ?? [];
    if (changedQuestions.length)
      await saveAnswers(assessmentId, JSON.stringify(state?.assessment?.answers))

    return dispatch({ type: SAVE_ANSWERS_SUCCESS })
  } catch (e) {
    return dispatch({ type: SAVE_ANSWERS_ERROR, payload: e })
  }
}

const handleToggleAnswer = (questionId, answerId, answerTypeId) => dispatch => {
  return dispatch({ type: TOGGLE_ANSWER, payload: { questionId, answerId, answerTypeId } });
}

const handleFlagQuestion = (questionIndex) => dispatch => {
  return dispatch({ type: FLAG_QUESTION, payload: questionIndex });
}

const handleSetQuestion = (questionIndex) => dispatch => {
  return dispatch({ type: SET_QUESTION, payload: questionIndex });
}

const handleSetQuestionAnswered = (questionIndex) => dispatch => {
  return dispatch({ type: SET_ANSWERED, payload: questionIndex });
}


export {
  handleToggleAnswer,
  handleFlagQuestion,
  handleSetQuestion,
  handleSetQuestionAnswered,
  handleStartAssessment,
  handleSubmitAssessment,
  handleSaveAnswers,
  handleClearChangedQuestions
}