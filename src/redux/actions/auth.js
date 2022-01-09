import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_PENDING,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  VERIFY_USER_PENDING,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR
} from "../types/auth"

import { signIn, signOut, verifyUser } from '../../api/auth'

const handleSignIn = (username, password) => async dispatch => {
  dispatch({ type: SIGN_IN_PENDING })
  try {
    const data = await signIn(username, password)
    return dispatch({ type: SIGN_IN_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: SIGN_IN_ERROR, payload: e })
  }
}

const handleSignOut = () => async dispatch => {
  dispatch({ type: SIGN_OUT_PENDING })
  try {
    const data = await signOut()
    return dispatch({ type: SIGN_OUT_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: SIGN_OUT_ERROR, payload: e })
  }
}

const handleVerifyUser = () => async dispatch => {
  dispatch({ type: VERIFY_USER_PENDING })
  try {
    const data = await verifyUser()
    return dispatch({ type: VERIFY_USER_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({ type: VERIFY_USER_ERROR, payload: e })
  }
}

export {
  handleSignIn,
  handleSignOut,
  handleVerifyUser
}