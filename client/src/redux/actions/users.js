import {
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,

  SAVE_USER_PENDING,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,

  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,

  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,

  GET_USERS_PENDING,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,  
} from '../types/users'

import {
  addUser,
  saveUser,
  deleteUser,
  getSingleUser,
  getUserList,
} from '../../api/users'

const handleAddUser = (formData) => async dispatch => {
  dispatch({ type: ADD_USER_PENDING })
  try {
    const data = await addUser(formData)
    return dispatch({ type: ADD_USER_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: ADD_USER_ERROR, payload: e })
  }
}

const handleSaveUser = (id, formData) => async dispatch => {
  dispatch({ type: SAVE_USER_PENDING })
  try {
    const data = await saveUser(id, formData)
    return dispatch({ type: SAVE_USER_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: SAVE_USER_ERROR, payload: e })
  }
}

const handleDeleteUser = (id) => async dispatch => {
  dispatch({ type: DELETE_USER_PENDING })
  try {
    const data = await deleteUser(id)
    return dispatch({ type: DELETE_USER_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: DELETE_USER_ERROR, payload: e })
  }
}

const handleGetSingleUser = (id) => async dispatch => {
  dispatch({ type: GET_USER_PENDING })
  try {
    const data = await getSingleUser(id)
    return dispatch({ type: GET_USER_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_USER_ERROR, payload: e })
  }
}

const handleGetUserList = () => async dispatch => {
  dispatch({ type: GET_USERS_PENDING })
  try {
    const data = await getUserList()
    return dispatch({ type: GET_USERS_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: GET_USERS_ERROR, payload: e })
  }
}


export {
  handleAddUser,
  handleSaveUser,
  handleDeleteUser,
  handleGetSingleUser,
  handleGetUserList
}