import {
  GET_GROUP_PENDING,
  GET_GROUP_SUCCESS,
  GET_GROUP_ERROR,

  GET_ASSIGNED_USERS_PENDING,
  GET_ASSIGNED_USERS_SUCCESS,
  GET_ASSIGNED_USERS_ERROR,

  ADD_USER_TO_GROUP_PENDING,
  ADD_USER_TO_GROUP_SUCCESS,
  ADD_USER_TO_GROUP_ERROR,

  REMOVE_USER_FROM_GROUP_PENDING,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_ERROR
} from "../../types/groups/group"

import {
  getSingleGroup,
  getAssignedUsers,
  addUserToGroup,
  removeUserFromGroup
} from '../../../api/groups'

const handleGetSingleGroup = (id) => async dispatch => {
  dispatch({ type: GET_GROUP_PENDING })
  try {
    const data = await getSingleGroup(id)
    return dispatch({ type: GET_GROUP_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_GROUP_ERROR, payload: e })
  }
}

const handleGetAssignedUsers = (id) => async dispatch => {
  dispatch({ type: GET_ASSIGNED_USERS_PENDING })
  try {
    const data = await getAssignedUsers(id)
    return dispatch({ type: GET_ASSIGNED_USERS_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: GET_ASSIGNED_USERS_ERROR, payload: e })
  }
}

const handleAddUserToGroup = (userId, groupId) => async dispatch => {
  dispatch({ type: ADD_USER_TO_GROUP_PENDING })
  try {
    const data = await addUserToGroup(userId, groupId)
    return dispatch({ type: ADD_USER_TO_GROUP_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: ADD_USER_TO_GROUP_ERROR, payload: e })
  }
}

const handleRemoveUserFromGroup = (userId, groupId) => async dispatch => {
  dispatch({ type: REMOVE_USER_FROM_GROUP_PENDING })
  try {
    const data = await removeUserFromGroup(userId, groupId)
    return dispatch({ type: REMOVE_USER_FROM_GROUP_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: REMOVE_USER_FROM_GROUP_ERROR, payload: e })
  }
}

export {
  handleGetSingleGroup,
  handleGetAssignedUsers,
  handleAddUserToGroup,
  handleRemoveUserFromGroup
}