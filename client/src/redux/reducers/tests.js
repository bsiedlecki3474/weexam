import {
	GET_TESTS_PENDING,
	GET_TESTS_SUCCESS,
	GET_TESTS_ERROR
} from '../types/tests/tests'

const initialState = {
	error: null,
	data: null
};

const tests = (state = initialState, action) => {
  switch (action.type) {
		case GET_TESTS_PENDING:
			return {...state, pending: true }
		case GET_TESTS_SUCCESS:
			return {...state, pending: false, data: action.payload }
		case GET_TESTS_ERROR:
			return {...state, pending: false, error: action.payload }
		default:
			return state
	}
}

export default tests;