import {
  GET_GROUP_LIST_PENDING,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_ERROR
} from "../types/group"

import { getGroupList } from '../../api/group'


const handleGetGroupList = () => async dispatch => {
  dispatch({ type: GET_GROUP_LIST_PENDING })
  try {
    const data = await getGroupList()
    return dispatch({ type: GET_GROUP_LIST_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: GET_GROUP_LIST_ERROR, payload: e })
  }
}


export {
  handleGetGroupList
}