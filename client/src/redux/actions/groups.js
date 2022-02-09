import {
  GET_GROUP_LIST_PENDING,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_ERROR,
  ADD_GROUP_PENDING,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_ERROR
} from "../types/groups"

import { getGroupList, addGroup } from '../../api/groups'


const handleGetGroupList = () => async dispatch => {
  dispatch({ type: GET_GROUP_LIST_PENDING })
  try {
    const data = await getGroupList()
    return dispatch({ type: GET_GROUP_LIST_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: GET_GROUP_LIST_ERROR, payload: e })
  }
}

const handleAddGroup = (formData) => async dispatch => {
  dispatch({ type: ADD_GROUP_PENDING })
  try {
    const data = await addGroup(formData)
    return dispatch({ type: ADD_GROUP_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: ADD_GROUP_ERROR, payload: e })
  }
}

export {
  handleGetGroupList,
  handleAddGroup
}