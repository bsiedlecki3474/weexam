import {
	SIGN_IN_PENDING,
	SIGN_IN_SUCCESS,
	SIGN_IN_ERROR,
	SIGN_OUT
} from '../types/auth'

const initialState = {
	pending: false,
	error: null,
	data: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
		case SIGN_IN_PENDING:
			return {...state, pending: true }
		case SIGN_IN_SUCCESS:
			// action.payload?.token && localStorage.setItem('token', action.payload.token);
			return {...state, pending: false, data: action.payload }
		case SIGN_IN_ERROR:
			return {...state, pending: false, error: action.payload }
		case SIGN_OUT:
			// localStorage.removeItem('token');
			return {...state, data: [] }

		default:
			return state
	}
}

export default auth;