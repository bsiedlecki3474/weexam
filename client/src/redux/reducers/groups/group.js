import {
  GET_GROUP_PENDING,
  GET_GROUP_SUCCESS,
  GET_GROUP_ERROR
} from "../../types/groups/group"

const initialState = {
	error: null,
	data: null
};

const group = (state = initialState, action) => {
  switch (action.type) {
		case GET_GROUP_PENDING:
			return {...state, pending: true }
		case GET_GROUP_SUCCESS:
			return {...state, pending: false, data: action.payload }
		case GET_GROUP_ERROR:
			return {...state, pending: false, error: action.payload }
		default:
			return state
	}
}

export default group;