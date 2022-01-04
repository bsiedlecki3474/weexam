import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT
} from "../types/auth"

import { signIn } from '../../api/auth'

const handleSignIn = (username, password) => async dispatch => {
  dispatch({ type: SIGN_IN_PENDING })
  try {
    const data = await signIn(username, password)
    return dispatch({ type: SIGN_IN_SUCCESS, payload: data })
  } catch (err) {
    return dispatch({ type: SIGN_IN_ERROR, payload: err })
  }
}

const handleSignOut = () => dispatch => {
  dispatch({ type: SIGN_OUT })
}

export {
  handleSignIn,
  handleSignOut
}