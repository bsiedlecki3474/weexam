import {
	GET_USERS_PENDING,
	GET_USERS_SUCCESS,
	GET_USERS_ERROR
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
		default:
			return state
	}
}

export default users;