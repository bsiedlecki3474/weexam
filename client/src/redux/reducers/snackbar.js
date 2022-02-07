import { SHOW_SNACKBAR, HIDE_SNACKBAR, CLEAR_SNACKBAR } from '../types/snackbar.js';

const initialState = {
	snackbarMessage: null,
	snackbarOpen: false,
	snackbarDuration: 4000,
	snackbarAction: null,
	snackbarSeverity: 'info',
	snackbarTransitionDuration: 200
}

const snackbar = (state = {}, action) => {
	switch (action.type) {
		case SHOW_SNACKBAR:
			return action.payload === null
				? {}
				: {
					...state,
					snackbarOpen: true,
					snackbarMessage: action.message ?? action.snackMessage,
					snackbarDuration: action.duration ?? initialState.snackbarDuration,
					snackbarAction: action.action ?? action.button ?? initialState.snackbarAction,
					snackbarSeverity: action.severity ?? action.variant ?? initialState.snackbarSeverity,
					snackbarTransitionDuration: action.transitionDuration ?? initialState.snackbarTransitionDuration
				}
		case HIDE_SNACKBAR: 
			return action.payload === null
				? {}
				: {
					...state,
					snackbarOpen: false
				}
		case CLEAR_SNACKBAR:
			return action.payload === null
				? {}
				: {
					...state,
					...initialState
				}
		default:
			return state
	}
}

export default snackbar;