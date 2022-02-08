import {
	ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR
} from '../types/users'

const initialState = {
	error: null,
	data: null
};

const addEntry = (state = initialState, action) => {
  switch (action.type) {
		case ADD_USER_PENDING:
			return {...state, pending: true }
		case ADD_USER_SUCCESS:
			return {...state, pending: false, data: action.payload }
		case ADD_USER_ERROR:
			return {...state, pending: false, error: action.payload }
		default:
			return state
	}
}

export default addEntry;