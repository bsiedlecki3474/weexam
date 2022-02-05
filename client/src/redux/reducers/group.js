import {
  GET_GROUP_LIST_PENDING,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_ERROR
} from "../types/group"

const initialState = {
	error: null,
	data: null
};

const group = (state = initialState, action) => {
  switch (action.type) {
		case GET_GROUP_LIST_PENDING:
			return {...state, pending: true }
		case GET_GROUP_LIST_SUCCESS:
			return {...state, pending: false, data: action.payload }
		case GET_GROUP_LIST_ERROR:
			return {...state, pending: false, error: action.payload }
		default:
			return state
	}
}

export default group;