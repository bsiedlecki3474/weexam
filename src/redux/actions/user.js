import {
  GET_USER_LIST_PENDING,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR
} from "../types/user"

import { getUserList } from '../../api/user'


const handleGetUserList = () => async dispatch => {
  dispatch({ type: GET_USER_LIST_PENDING })
  try {
    const data = await getUserList()
    return dispatch({ type: GET_USER_LIST_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: GET_USER_LIST_ERROR, payload: e })
  }
}


export {
  handleGetUserList
}