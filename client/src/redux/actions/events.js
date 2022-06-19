import {
  ADD_EVENT_PENDING,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_ERROR,

  SAVE_EVENT_PENDING,
  SAVE_EVENT_SUCCESS,
  SAVE_EVENT_ERROR,

  DELETE_EVENT_PENDING,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,

  GET_EVENT_PENDING,
  GET_EVENT_SUCCESS,
  GET_EVENT_ERROR,

  GET_EVENT_ASSESSMENT_PENDING,
  GET_EVENT_ASSESSMENT_SUCCESS,
  GET_EVENT_ASSESSMENT_ERROR,

  GET_ASSIGNED_GROUPS_PENDING,
  GET_ASSIGNED_GROUPS_SUCCESS,
  GET_ASSIGNED_GROUPS_ERROR,

  ADD_GROUP_PENDING,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_ERROR,

  REMOVE_GROUP_PENDING,
  REMOVE_GROUP_SUCCESS,
  REMOVE_GROUP_ERROR,

  GET_EVENT_REPORT_PENDING,
  GET_EVENT_REPORT_SUCCESS,
  GET_EVENT_REPORT_ERROR

} from '../types/events'

import {
  addEvent,
  saveEvent,
  deleteEvent,
  getEvent,
  getEventReport,
  getAssignedGroups,
  addGroup,
  removeGroup,
} from '../../api/events'

const handleAddEvent = (testId, formData) => async dispatch => {
  dispatch({ type: ADD_EVENT_PENDING })
  try {
    const data = await addEvent(testId, formData)
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

const handleGetEvent = (id) => async dispatch => {
  dispatch({ type: GET_EVENT_PENDING })
  try {
    const data = await getEvent(id)
    return dispatch({ type: GET_EVENT_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_EVENT_ERROR, payload: e })
  }
}

const handleGetEventAssessment = (id) => async dispatch => {
  dispatch({ type: GET_EVENT_ASSESSMENT_PENDING })
  try {
    const data = await getEvent(id)
    return dispatch({ type: GET_EVENT_ASSESSMENT_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_EVENT_ASSESSMENT_ERROR, payload: e })
  }
}

const handleGetEventReport = (id) => async dispatch => {
  dispatch({ type: GET_EVENT_REPORT_PENDING })
  try {
    const data = await getEventReport(id)
    return dispatch({ type: GET_EVENT_REPORT_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_EVENT_REPORT_ERROR, payload: e })
  }
}

const handleGetAssignedGroups = (id) => async dispatch => {
  dispatch({ type: GET_ASSIGNED_GROUPS_PENDING })
  try {
    const data = await getAssignedGroups(id)
    return dispatch({ type: GET_ASSIGNED_GROUPS_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_ASSIGNED_GROUPS_ERROR, payload: e })
  }
}

const handleAddGroup = (id, groupId) => async dispatch => {
  dispatch({ type: ADD_GROUP_PENDING })
  try {
    const data = await addGroup(id, groupId)
    return dispatch({ type: ADD_GROUP_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: ADD_GROUP_ERROR, payload: e })
  }
}

const handleRemoveGroup = (id, groupId) => async dispatch => {
  dispatch({ type: REMOVE_GROUP_PENDING })
  try {
    const data = await removeGroup(id, groupId)
    return dispatch({ type: REMOVE_GROUP_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: REMOVE_GROUP_ERROR, payload: e })
  }
}

export {
  handleAddEvent,
  handleSaveEvent,
  handleDeleteEvent,
  handleGetEvent,
  handleGetEventReport,
  handleGetAssignedGroups,
  handleAddGroup,
  handleRemoveGroup
}