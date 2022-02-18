import {
  GET_TEST_PENDING,
  GET_TEST_SUCCESS,
  GET_TEST_ERROR,

  GET_ASSIGNED_GROUPS_PENDING,
  GET_ASSIGNED_GROUPS_SUCCESS,
  GET_ASSIGNED_GROUPS_ERROR
} from "../../types/tests/test"

import {
  getSingleTest,
  getAssignedGroups
} from '../../../api/tests'

const handleGetSingleTest = (id) => async dispatch => {
  dispatch({ type: GET_TEST_PENDING })
  try {
    const data = await getSingleTest(id)
    return dispatch({ type: GET_TEST_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_TEST_ERROR, payload: e })
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
  handleGetSingleTest,
  handleGetAssignedGroups
}