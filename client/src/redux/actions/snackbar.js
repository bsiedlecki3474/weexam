import {
	SHOW_SNACKBAR,
	HIDE_SNACKBAR,
	CLEAR_SNACKBAR
} from '../types/snackbar.js';

export function handleShowSnackbar(options) {
	return {
		type: SHOW_SNACKBAR,
		...options
	}
}

export function handleHideSnackbar() {
	return {
		type: HIDE_SNACKBAR
	}
}

export function handleClearSnackbar() {
	return {
		type: CLEAR_SNACKBAR
	}
}

export function showSnackbar(options) {
	return dispatch => dispatch(handleShowSnackbar(options));
}

export function hideSnackbar() {
	return dispatch => {
		dispatch(handleHideSnackbar());
		setTimeout(() => dispatch(handleClearSnackbar()), 200);
	}
}