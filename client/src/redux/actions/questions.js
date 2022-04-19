import {
  SAVE_QUESTIONS_PENDING,
  SAVE_QUESTIONS_SUCCESS,
  SAVE_QUESTIONS_ERROR
} from '../types/questions'

import { saveQuestions } from '../../api/questions'

const handleSaveQuestions = (testId, questions) => async dispatch => {
  dispatch({ type: SAVE_QUESTIONS_PENDING })
  try {
    const data = await saveQuestions(testId, questions)
    return dispatch({ type: SAVE_QUESTIONS_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: SAVE_QUESTIONS_ERROR, payload: e })
  }
}

export {
  handleSaveQuestions
}