import {
  ADD_EVENT_PENDING,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_ERROR,

  SAVE_EVENT_PENDING,
  SAVE_EVENT_SUCCESS,
  SAVE_EVENT_ERROR,

  DELETE_EVENT_PENDING,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR
} from '../types/events'

import {
  addEvent,
  saveEvent,
  deleteEvent
} from '../../api/events'

const handleAddEvent = (formData) => async dispatch => {
  dispatch({ type: ADD_EVENT_PENDING })
  try {
    const data = await addEvent(formData)
    return dispatch({ type: ADD_EVENT_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: ADD_EVENT_ERROR, payload: e })
  }
}

const handleSaveEvent = (id, formData) => async dispatch => {
  dispatch({ type: SAVE_EVENT_PENDING })
  try {
    const data = await saveEvent(id, formData)
    return dispatch({ type: SAVE_EVENT_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: SAVE_EVENT_ERROR, payload: e })
  }
}

const handleDeleteEvent = (id, formData) => async dispatch => {
  dispatch({ type: DELETE_EVENT_PENDING })
  try {
    const data = await deleteEvent(id, formData)
    return dispatch({ type: DELETE_EVENT_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: DELETE_EVENT_ERROR, payload: e })
  }
}

export {
  handleAddEvent,
  handleSaveEvent,
  handleDeleteEvent
}