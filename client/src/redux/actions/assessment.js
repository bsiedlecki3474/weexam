import {
  CLEAR_ASSESSMENT,
  SAVE_ANSWERS_PENDING,
  SAVE_ANSWERS_SUCCESS,
  SAVE_ANSWERS_ERROR,
  TOGGLE_ANSWER,
  FLAG_QUESTION,
  SET_QUESTION,
  SET_ANSWERED,
  CLEAR_CHANGED_QUESTIONS
} from '../types/assessment'

import {
  startAssessment,
  saveAnswers
} from '../../api/assessments'

const handleStartAssessment = id => dispatch => {
  dispatch({ type: CLEAR_ASSESSMENT });
  return startAssessment(id);
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
  handleSaveAnswers,
  handleClearChangedQuestions
}