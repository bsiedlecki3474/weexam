import {
	GET_USER_LIST_PENDING,
	GET_USER_LIST_SUCCESS,
	GET_USER_LIST_ERROR
} from '../types/user'

const initialState = {
	error: null,
	data: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
		case GET_USER_LIST_PENDING:
			return {...state, pending: true }
		case GET_USER_LIST_SUCCESS:
			return {...state, pending: false, data: action.payload }
		case GET_USER_LIST_ERROR:
			return {...state, pending: false, error: action.payload }
		default:
			return state
	}
}

export default user;