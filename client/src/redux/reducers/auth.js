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
} from '../types/auth'

const initialState = {
	error: null,
	data: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
		case SIGN_IN_PENDING:
		case SIGN_OUT_PENDING:
		case VERIFY_USER_PENDING:
			return {...state, pending: true, error: null }

		case SIGN_IN_SUCCESS:
		case SIGN_OUT_SUCCESS:
		case VERIFY_USER_SUCCESS:
			return {...state, pending: false, data: action.payload, error: null }
			
		case SIGN_IN_ERROR:
		case SIGN_OUT_ERROR:
		case VERIFY_USER_ERROR:
			return {...state, pending: false, error: action.payload }

		default:
			return state
	}
}

export default auth;