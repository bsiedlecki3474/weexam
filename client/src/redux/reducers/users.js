import {
	GET_USERS_PENDING,
	GET_USERS_SUCCESS,
	GET_USERS_ERROR,
	ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR
} from '../types/users'

const initialState = {
	error: null,
	data: null
};

const users = (state = initialState, action) => {
  switch (action.type) {
		case GET_USERS_PENDING:
			return {...state, pending: true }
		case GET_USERS_SUCCESS:
			return {...state, pending: false, data: action.payload }
		case GET_USERS_ERROR:
			return {...state, pending: false, error: action.payload }
		case ADD_USER_PENDING:
			return {...state, pending: true }
		case ADD_USER_SUCCESS:
			return {...state, pending: false }
		case ADD_USER_ERROR:
			return {...state, pending: false, error: action.payload }
		default:
			return state
	}
}

export default users;