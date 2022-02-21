import {
  ADD_TEST_PENDING,
  ADD_TEST_SUCCESS,
  ADD_TEST_ERROR,

  SAVE_TEST_PENDING,
  SAVE_TEST_SUCCESS,
  SAVE_TEST_ERROR,

  GET_TESTS_PENDING,
  GET_TESTS_SUCCESS,
  GET_TESTS_ERROR,

  GET_TEST_PENDING,
  GET_TEST_SUCCESS,
  GET_TEST_ERROR,

  GET_ASSIGNED_GROUPS_PENDING,
  GET_ASSIGNED_GROUPS_SUCCESS,
  GET_ASSIGNED_GROUPS_ERROR
} from '../types/tests'

import {
  addTest,
  saveTest,
  getTestList,
  getSingleTest,
  getAssignedGroups
} from '../../api/tests'

const handleAddTest = (formData) => async dispatch => {
  dispatch({ type: ADD_TEST_PENDING })
  try {
    const data = await addTest(formData)
    return dispatch({ type: ADD_TEST_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: ADD_TEST_ERROR, payload: e })
  }
}

const handleSaveTest = (id, formData) => async dispatch => {
  dispatch({ type: SAVE_TEST_PENDING })
  try {
    const data = await saveTest(id, formData)
    return dispatch({ type: SAVE_TEST_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: SAVE_TEST_ERROR, payload: e })
  }
}

const handleGetSingleTest = (id) => async dispatch => {
  dispatch({ type: GET_TEST_PENDING })
  try {
    const data = await getSingleTest(id)
    return dispatch({ type: GET_TEST_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_TEST_ERROR, payload: e })
  }
}

const handleGetTestList = () => async dispatch => {
  dispatch({ type: GET_TESTS_PENDING })
  try {
    const data = await getTestList()
    return dispatch({ type: GET_TESTS_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: GET_TESTS_ERROR, payload: e })
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

export {
  handleAddTest,
  handleSaveTest,
  handleGetTestList,
  handleGetSingleTest,
  handleGetAssignedGroups
}