import {
	ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR
} from '../types/users'

import {
	ADD_GROUP_PENDING,
	ADD_GROUP_SUCCESS,
	ADD_GROUP_ERROR
} from '../types/groups/groups';

const initialState = {
	error: null,
	data: null
};

const addEntry = (state = initialState, action) => {
  switch (action.type) {
		case ADD_USER_PENDING:
		case ADD_GROUP_PENDING:
			return {...state, pending: true }
		case ADD_USER_SUCCESS:
		case ADD_GROUP_SUCCESS:
			return {...state, pending: false, data: action.payload }
		case ADD_USER_ERROR:
		case ADD_GROUP_ERROR:
			return {...state, pending: false, error: action.payload }
		default:
			return state
	}
}

export default addEntry;