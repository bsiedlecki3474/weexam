import {
  GET_TESTS_PENDING,
  GET_TESTS_SUCCESS,
  GET_TESTS_ERROR,
  // ADD_TEST_PENDING,
  // ADD_TEST_SUCCESS,
  // ADD_TEST_ERROR
} from '../types/tests'

import { getTestList/*, addTest*/ } from '../../api/tests'

const handleGetTestList = () => async dispatch => {
  dispatch({ type: GET_TESTS_PENDING })
  try {
    const data = await getTestList()
    return dispatch({ type: GET_TESTS_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: GET_TESTS_ERROR, payload: e })
  }
}

// const handleAddTest = (formData) => async dispatch => {
//   dispatch({ type: ADD_TEST_PENDING })
//   try {
//     const data = await addTest(formData)
//     return dispatch({ type: ADD_TEST_SUCCESS, data })
//   } catch (e) {
//     return dispatch({ type: ADD_TEST_ERROR, payload: e })
//   }
// }

export {
  handleGetTestList,
  // handleAddTest
}