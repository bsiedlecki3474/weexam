import {
  GET_USERS_PENDING,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR
} from '../types/users'

import { getUserList, addUser } from '../../api/users'

const handleGetUserList = () => async dispatch => {
  dispatch({ type: GET_USERS_PENDING })
  try {
    const data = await getUserList()
    return dispatch({ type: GET_USERS_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: GET_USERS_ERROR, payload: e })
  }
}

const handleAddUser = (formData) => async dispatch => {
  dispatch({ type: ADD_USER_PENDING })
  try {
    await addUser(formData)
    return dispatch({ type: ADD_USER_SUCCESS })
  } catch (e) {
    return dispatch({ type: ADD_USER_ERROR, payload: e })
  }
}

export {
  handleGetUserList,
  handleAddUser
}